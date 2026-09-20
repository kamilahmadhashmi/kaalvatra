// scripts/deploy-s3.mjs
// Automated AWS S3 Deployment Script for KAALVATRA v2 Broadsheet

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { resolve, relative, extname } from 'path';

// Automatically load .env file if present
const envPath = resolve(process.cwd(), '.env');
if (existsSync(envPath)) {
  try {
    const envContent = readFileSync(envPath, 'utf8');
    for (const line of envContent.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  } catch {}
}

// Configuration
const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'first-commit-kaalvatra-2026';
const REGION = process.env.AWS_REGION || 'ap-south-1';
const DIST_DIR = resolve(process.cwd(), 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

function getFiles(dir) {
  const subdirs = readdirSync(dir);
  const files = subdirs.map((subdir) => {
    const res = resolve(dir, subdir);
    return statSync(res).isDirectory() ? getFiles(res) : res;
  });
  return files.reduce((a, f) => a.concat(f), []);
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║       KAALVATRA v2.0 — AWS S3 PRODUCTION DEPLOYMENT       ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  console.log(`Target Bucket : ${BUCKET_NAME}`);
  console.log(`AWS Region    : ${REGION}`);
  console.log(`Source Folder : ${DIST_DIR}\n`);

  // Check credentials
  const hasAccessKey = Boolean(process.env.AWS_ACCESS_KEY_ID);
  const hasSecretKey = Boolean(process.env.AWS_SECRET_ACCESS_KEY);

  if (!hasAccessKey || !hasSecretKey) {
    console.warn('⚠️  AWS Credentials not detected in environment variables.');
    console.warn('   Please export AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY or configure AWS CLI.');
    console.warn('   Example (PowerShell):');
    console.warn('     $env:AWS_ACCESS_KEY_ID="AKIA..."');
    console.warn('     $env:AWS_SECRET_ACCESS_KEY="..."');
    console.warn('     $env:AWS_REGION="ap-south-1"');
    console.warn('     npm run deploy:aws\n');
  }

  const s3 = new S3Client({
    region: REGION
  });

  let files;
  try {
    files = getFiles(DIST_DIR);
  } catch (err) {
    console.error(`❌ Could not read dist/ directory. Run 'npm run build' first.`);
    process.exit(1);
  }

  console.log(`Found ${files.length} build artifacts in dist/. Starting deployment...\n`);

  let successCount = 0;
  for (const filePath of files) {
    const relativePath = relative(DIST_DIR, filePath).replace(/\\/g, '/');
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const fileContent = readFileSync(filePath);

    // Cache control policy
    // Static assets with hashed filenames can be cached immutably for 1 year.
    // index.html must never be cached so users always get the latest bundle.
    const isAsset = relativePath.startsWith('assets/');
    const cacheControl = isAsset
      ? 'public, max-age=31536000, immutable'
      : 'max-age=0, no-cache, no-store, must-revalidate';

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: relativePath,
          Body: fileContent,
          ContentType: contentType,
          CacheControl: cacheControl
        })
      );
      console.log(`  ✓ Uploaded [${contentType.split(';')[0]}] -> s3://${BUCKET_NAME}/${relativePath}`);
      successCount++;
    } catch (err) {
      console.error(`  ✗ Failed to upload ${relativePath}:`, err.message);
    }
  }

  console.log(`\n=============================================================`);
  if (successCount === files.length) {
    console.log(`✨ Successfully uploaded all ${successCount} files to S3 bucket '${BUCKET_NAME}'!`);
    console.log(`\nLive S3 Website URL:`);
    console.log(`👉 http://${BUCKET_NAME}.s3-website.${REGION}.amazonaws.com\n`);
  } else {
    console.warn(`⚠️ Completed with ${files.length - successCount} errors (${successCount}/${files.length} uploaded).`);
  }
}

main().catch((err) => {
  console.error('Fatal Deployment Error:', err);
  process.exit(1);
});
