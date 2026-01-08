# 🚀 AWS Deployment Guide for Travel Booking Application

**Last Updated:** January 2025  
**Application:** Angular 20.3.4 Travel Booking Platform  
**Current Hosting:** Vercel

---

## 📋 Table of Contents

1. [AWS Hosting Options Comparison](#aws-hosting-options-comparison)
2. [Recommended Solution: S3 + CloudFront](#recommended-solution-s3--cloudfront)
3. [Step-by-Step Deployment Guide](#step-by-step-deployment-guide)
4. [Files to Keep/Remove](#files-to-keepremove)
5. [Cost Analysis](#cost-analysis)
6. [Alternative: AWS Amplify](#alternative-aws-amplify)
7. [Post-Deployment Checklist](#post-deployment-checklist)

---

## 🎯 AWS Hosting Options Comparison

### Option 1: **S3 + CloudFront** ⭐ RECOMMENDED
- **Best for:** Static websites, low cost, high performance
- **Pros:** 
  - Very low cost (~$1-5/month for low traffic)
  - Global CDN (fast worldwide)
  - Simple setup
  - Pay only for what you use
- **Cons:** 
  - Manual deployment process
  - No automatic CI/CD (can be added)

### Option 2: **AWS Amplify**
- **Best for:** Automatic deployments, CI/CD integration
- **Pros:**
  - Automatic builds from Git
  - CI/CD built-in
  - Easy setup
  - Free tier available
- **Cons:**
  - Slightly more expensive than S3
  - Less control over infrastructure

### Option 3: **EC2 (Not Recommended)**
- **Best for:** Dynamic applications with backend
- **Pros:** Full server control
- **Cons:**
  - Overkill for static site
  - Expensive (~$10-50/month minimum)
  - Requires server management

---

## ✅ Recommended Solution: S3 + CloudFront

**Why?** Your app is static (Angular), so S3 + CloudFront is perfect and most cost-effective.

---

## 📦 Step-by-Step Deployment Guide

### Prerequisites

1. **AWS Account** (Create at https://aws.amazon.com)
2. **AWS CLI** installed (https://aws.amazon.com/cli/)
3. **Node.js & npm** (already have)
4. **Domain name** (optional, can use S3 URL)

---

### Step 1: Build Your Angular Application

```bash
cd travel-booking

# Install dependencies
npm install --legacy-peer-deps

# Build for production
npm run build

# Verify build output
ls -la dist/travel-booking/browser/
```

**Expected output:** HTML, CSS, JS files in `dist/travel-booking/browser/`

---

### Step 2: Create S3 Bucket

1. **Login to AWS Console** → Go to S3 service
2. **Create Bucket:**
   - Bucket name: `your-travel-booking-app` (must be globally unique)
   - Region: Choose closest to your users (e.g., `ap-south-1` for India)
   - **Uncheck:** "Block all public access" (we need public access)
   - **Enable:** "Bucket Versioning" (optional, for backup)
   - Click "Create bucket"

3. **Configure Bucket for Static Website:**
   - Go to your bucket → **Properties** tab
   - Scroll to **Static website hosting**
   - Click **Edit**
   - Enable: **Static website hosting**
   - Index document: `index.html`
   - Error document: `index.html` (for Angular routing)
   - Click **Save changes**

4. **Set Bucket Policy (Make Public):**
   - Go to **Permissions** tab → **Bucket policy**
   - Click **Edit** and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-travel-booking-app/*"
    }
  ]
}
```

Replace `your-travel-booking-app` with your bucket name.

---

### Step 3: Upload Files to S3

**Option A: Using AWS Console (Easier for beginners)**

1. Go to your S3 bucket
2. Click **Upload**
3. Navigate to `travel-booking/dist/travel-booking/browser/`
4. Select **ALL files** (including folders)
5. Click **Upload**
6. Wait for upload to complete

**Option B: Using AWS CLI (Faster, recommended)**

```bash
# Configure AWS CLI (first time only)
aws configure
# Enter: Access Key ID, Secret Access Key, Region, Output format (json)

# Upload files
aws s3 sync dist/travel-booking/browser/ s3://your-travel-booking-app/ --delete

# Verify upload
aws s3 ls s3://your-travel-booking-app/
```

---

### Step 4: Set Up CloudFront Distribution (CDN)

**Why CloudFront?**
- Faster loading worldwide
- HTTPS/SSL certificate (free)
- Custom domain support
- Better SEO

1. **Go to CloudFront** in AWS Console
2. **Create Distribution:**
   - **Origin Domain:** Select your S3 bucket (not the website endpoint)
   - **Origin Path:** Leave empty
   - **Name:** `travel-booking-cdn`
   - **Viewer Protocol Policy:** Redirect HTTP to HTTPS
   - **Allowed HTTP Methods:** GET, HEAD, OPTIONS
   - **Default Root Object:** `index.html`
   - **Price Class:** Choose based on your audience
     - Use all edge locations (best performance, higher cost)
     - Use only North America and Europe (lower cost)
   - **Alternate Domain Names (CNAMEs):** Add your domain if you have one
   - **SSL Certificate:** Request or import certificate if using custom domain
   - Click **Create Distribution**

3. **Configure Error Pages (Important for Angular Routing):**
   - Go to your distribution → **Error Pages** tab
   - Click **Create Custom Error Response**
   - **HTTP Error Code:** `403: Forbidden`
   - **Response Page Path:** `/index.html`
   - **HTTP Response Code:** `200: OK`
   - Click **Create**
   - Repeat for `404: Not Found`

4. **Wait for Deployment:** CloudFront takes 10-15 minutes to deploy

---

### Step 5: Test Your Deployment

1. **S3 Website URL:** 
   - Go to S3 bucket → Properties → Static website hosting
   - Copy the URL: `http://your-bucket-name.s3-website-region.amazonaws.com`
   - Test in browser

2. **CloudFront URL:**
   - Go to CloudFront → Your distribution
   - Copy **Distribution domain name:** `d1234567890.cloudfront.net`
   - Test in browser (should be HTTPS)

---

## 🗂️ Files to Keep/Remove

### ✅ **KEEP These Files:**

```
travel-booking/
├── src/                          # ✅ Source code
├── public/                       # ✅ Static assets
├── package.json                  # ✅ Dependencies
├── angular.json                  # ✅ Build config
├── tsconfig.json                 # ✅ TypeScript config
├── .gitignore                    # ✅ Git ignore rules
└── README.md                     # ✅ Documentation
```

### ❌ **REMOVE Before Deployment:**

```bash
# Development files (not needed in production)
rm -rf node_modules/              # ❌ Will be reinstalled
rm -rf dist/                      # ❌ Will be rebuilt
rm -rf .angular/                  # ❌ Build cache
rm -rf .vscode/                   # ❌ IDE settings (optional)

# Documentation files (optional, keep if needed)
# rm -rf *.md                      # ❌ Markdown docs (optional)
# rm -rf tour-docs/                # ❌ Reference docs (optional)

# Vercel config (not needed for AWS)
rm vercel.json                    # ❌ Vercel-specific config
```

### 📝 **Files to Modify:**

1. **`.gitignore`** - Already good, no changes needed
2. **`package.json`** - No changes needed
3. **`angular.json`** - Verify build output path is correct

---

## 💰 Cost Analysis for Client

### **Monthly Cost Estimate (S3 + CloudFront)**

#### **Low Traffic (< 10,000 visitors/month):**

| Service | Usage | Cost |
|---------|-------|------|
| **S3 Storage** | ~50 MB | $0.001 |
| **S3 Requests** | 10,000 GET requests | $0.0004 |
| **CloudFront Data Transfer** | 5 GB out | $0.50 |
| **CloudFront Requests** | 10,000 requests | $0.0075 |
| **Route 53 (DNS)** | Hosted zone | $0.50 |
| **SSL Certificate** | Free via CloudFront | $0.00 |
| **Total** | | **~$1.00/month** |

#### **Medium Traffic (50,000 visitors/month):**

| Service | Usage | Cost |
|---------|-------|------|
| **S3 Storage** | ~50 MB | $0.001 |
| **S3 Requests** | 50,000 GET requests | $0.002 |
| **CloudFront Data Transfer** | 25 GB out | $2.25 |
| **CloudFront Requests** | 50,000 requests | $0.0375 |
| **Route 53 (DNS)** | Hosted zone | $0.50 |
| **Total** | | **~$2.80/month** |

#### **High Traffic (500,000 visitors/month):**

| Service | Usage | Cost |
|---------|-------|------|
| **S3 Storage** | ~50 MB | $0.001 |
| **S3 Requests** | 500,000 GET requests | $0.02 |
| **CloudFront Data Transfer** | 250 GB out | $21.00 |
| **CloudFront Requests** | 500,000 requests | $0.375 |
| **Route 53 (DNS)** | Hosted zone | $0.50 |
| **Total** | | **~$22.00/month** |

### **Cost Breakdown:**

1. **S3 Storage:** $0.023 per GB/month (first 50 GB free for 12 months)
2. **S3 Requests:** $0.0004 per 1,000 GET requests
3. **CloudFront Data Transfer:** 
   - First 10 TB: $0.085 per GB
   - Next 40 TB: $0.080 per GB
4. **CloudFront Requests:** $0.0075 per 10,000 HTTPS requests
5. **Route 53:** $0.50 per hosted zone/month

### **Free Tier (First 12 Months):**

- **S3:** 5 GB storage, 20,000 GET requests
- **CloudFront:** 1 TB data transfer out, 10,000,000 requests
- **Route 53:** First hosted zone free

**First Year Cost:** ~$0-1/month (mostly free tier)

---

## 🔄 Alternative: AWS Amplify (Easier Setup)

### **Why Choose Amplify?**

- Automatic deployments from Git
- Built-in CI/CD
- Preview deployments for branches
- Easier for non-technical users

### **Setup Steps:**

1. **Go to AWS Amplify Console**
2. **Connect Repository:**
   - Choose GitHub/GitLab/Bitbucket
   - Select your repository
   - Select branch (main/master)

3. **Configure Build Settings:**
   - Amplify auto-detects Angular
   - Or use custom build:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install --legacy-peer-deps
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist/travel-booking/browser
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

4. **Deploy:** Click "Save and deploy"

### **Amplify Costs:**

- **Free Tier:** 1,000 build minutes/month, 15 GB storage
- **After Free Tier:** ~$0.01 per build minute
- **Estimated:** $5-15/month for medium traffic

---

## ✅ Post-Deployment Checklist

### **Immediate:**

- [ ] Test all pages load correctly
- [ ] Verify Angular routing works (try direct URLs)
- [ ] Check HTTPS is working
- [ ] Test on mobile devices
- [ ] Verify images load correctly
- [ ] Check form submissions (EmailJS)

### **Performance:**

- [ ] Enable CloudFront compression (Gzip)
- [ ] Set cache headers (CloudFront behaviors)
- [ ] Optimize images (use WebP format)
- [ ] Enable browser caching

### **Security:**

- [ ] Verify HTTPS only (no HTTP)
- [ ] Set security headers (CloudFront)
- [ ] Review S3 bucket permissions
- [ ] Enable CloudFront logging

### **Monitoring:**

- [ ] Set up CloudWatch alarms
- [ ] Monitor CloudFront metrics
- [ ] Set up billing alerts ($5, $10, $20)
- [ ] Track visitor analytics

### **Custom Domain (Optional):**

- [ ] Purchase domain (Route 53 or external)
- [ ] Create SSL certificate (AWS Certificate Manager)
- [ ] Configure CloudFront with custom domain
- [ ] Update DNS records

---

## 🔧 Configuration Files Needed

### **1. Create `aws-deploy.sh` Script:**

```bash
#!/bin/bash
# AWS Deployment Script

echo "🚀 Building Angular application..."
npm run build

echo "📦 Uploading to S3..."
aws s3 sync dist/travel-booking/browser/ s3://your-travel-booking-app/ --delete

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "✅ Deployment complete!"
```

**Make executable:**
```bash
chmod +x aws-deploy.sh
```

### **2. Update `.gitignore` (if needed):**

```gitignore
# AWS
.aws/
*.pem
```

---

## 📊 Comparison: AWS vs Vercel

| Feature | AWS S3+CloudFront | Vercel |
|---------|-------------------|--------|
| **Cost (Low Traffic)** | ~$1/month | Free tier |
| **Cost (High Traffic)** | ~$22/month | $20/month |
| **Setup Complexity** | Medium | Easy |
| **CI/CD** | Manual/CLI | Automatic |
| **Custom Domain** | Free SSL | Free SSL |
| **CDN** | Global (CloudFront) | Global |
| **Scalability** | Unlimited | Unlimited |
| **Control** | Full | Limited |

**Recommendation:** 
- **Start with AWS** if you want more control and lower long-term costs
- **Stay with Vercel** if you prefer simplicity and free tier

---

## 🆘 Troubleshooting

### **Issue: 403 Forbidden Error**
**Solution:** Check S3 bucket policy and public access settings

### **Issue: Angular Routes Not Working**
**Solution:** Configure CloudFront error pages (404 → index.html)

### **Issue: Images Not Loading**
**Solution:** Check file paths are relative, not absolute

### **Issue: High Costs**
**Solution:** 
- Enable CloudFront compression
- Use CloudFront caching
- Optimize images
- Set up billing alerts

---

## 📞 Support Resources

- **AWS Documentation:** https://docs.aws.amazon.com
- **AWS Support:** Basic (free), Developer ($29/month), Business ($100/month)
- **AWS Free Tier:** https://aws.amazon.com/free/

---

## 🎯 Next Steps

1. **Create AWS Account** (if not done)
2. **Follow Step-by-Step Guide** above
3. **Test Deployment**
4. **Set Up Monitoring**
5. **Configure Custom Domain** (optional)
6. **Set Up Automated Deployments** (optional)

---

**Need Help?** Refer to AWS documentation or consider AWS Support plans for assistance.

