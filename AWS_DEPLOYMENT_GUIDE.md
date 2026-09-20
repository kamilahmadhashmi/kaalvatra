# KAALVATRA v2.0 — AWS Deployment Guide

This guide walks you through deploying **KAALVATRA v2.0 (National Editorial Broadsheet)** to AWS.

---

## Architecture Overview

- **Frontend**: Vite + React 19 + Tailwind CSS Single Page Application (SPA).
- **Static Hosting**: Amazon S3 bucket (`first-commit-kaalvatra-2026`) with Static Website Hosting enabled.
- **Global CDN & SSL**: Amazon CloudFront distribution routing traffic and handling SPA fallback (`/index.html`).
- **Live Data API**: Amazon API Gateway (`nechnrnjk0.execute-api.ap-south-1.amazonaws.com`) + AWS Lambda + DynamoDB.

---

## Method 1: Automated S3 Deployment (Direct from PowerShell)

We have configured an automated deployment script inside this project using the AWS SDK (`scripts/deploy-s3.mjs`). It automatically handles MIME types, asset cache policies, and uploading.

### Step 1: Set your AWS credentials in PowerShell
```powershell
$env:AWS_ACCESS_KEY_ID = "YOUR_AWS_ACCESS_KEY_ID"
$env:AWS_SECRET_ACCESS_KEY = "YOUR_AWS_SECRET_ACCESS_KEY"
$env:AWS_REGION = "ap-south-1"
$env:AWS_S3_BUCKET = "first-commit-kaalvatra-2026"
```

### Step 2: Run the automated deploy command
```powershell
npm run deploy:aws
```

The script builds the production bundle and uploads all files to S3 with optimal HTTP headers:
- `index.html`: `max-age=0, no-cache, no-store` (ensures users immediately see updates)
- `assets/*`: `public, max-age=31536000, immutable` (1-year edge caching for high performance)

### Step 3: Access your website
Your S3 website endpoint will be live at:
```
http://first-commit-kaalvatra-2026.s3-website.ap-south-1.amazonaws.com
```

---

## Method 2: Amazon CloudFront Setup (Recommended for Custom Domain & HTTPS)

To provide SSL (HTTPS) and lightning-fast global CDN delivery:

1. Open the [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/v3/home).
2. Click **Create distribution**.
3. **Origin domain**: Select your S3 website endpoint or S3 bucket (`first-commit-kaalvatra-2026.s3.ap-south-1.amazonaws.com`).
4. **Viewer protocol policy**: Redirect HTTP to HTTPS.
5. **Allowed HTTP methods**: `GET, HEAD, OPTIONS`.
6. Under **Custom error responses**:
   - HTTP error code: `403: Forbidden` -> Response page path: `/index.html`, HTTP response code: `200: OK`.
   - HTTP error code: `404: Not Found` -> Response page path: `/index.html`, HTTP response code: `200: OK`.
7. Click **Create distribution**.
8. CloudFront will provide an endpoint: `https://dXXXXXXXXXXXXX.cloudfront.net`.

---

## Method 3: AWS Amplify Hosting (Zero-Config 1-Click CI/CD)

If your code is stored on GitHub, AWS Amplify provides automated builds and deployments on every `git push`:

1. Open the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home).
2. Click **Deploy an app** -> **Host web app**.
3. Connect your Git repository (GitHub / GitLab / AWS CodeCommit).
4. Select the `kaalvatra` repository and branch (`main` or `rebrand/kaalvatra`).
5. In build settings, verify:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
6. Click **Save and Deploy**. Amplify deploys your app with instant global CDN, automatic SSL certificate, and custom domain support.

---

## Method 4: Standard AWS CLI (if AWS CLI is installed)

If you have the AWS CLI installed on your machine:
```powershell
# Build the project
npm run build

# Sync files to S3
aws s3 sync dist/ s3://first-commit-kaalvatra-2026 --delete

# Invalidate CloudFront cache (optional)
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```
