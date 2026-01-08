# ⚡ AWS Quick Start Guide

**For:** Non-technical users who want to deploy quickly

---

## 🎯 5-Minute Quick Deploy

### **Step 1: Create AWS Account** (2 minutes)
1. Go to https://aws.amazon.com
2. Click "Create an AWS Account"
3. Follow the signup process
4. Add payment method (won't be charged for free tier)

### **Step 2: Build Your App** (1 minute)
```bash
cd travel-booking
npm install --legacy-peer-deps
npm run build
```

### **Step 3: Create S3 Bucket** (1 minute)
1. Go to AWS Console → S3
2. Click "Create bucket"
3. Name: `your-travel-app` (unique name)
4. Uncheck "Block all public access"
5. Enable "Static website hosting"
6. Index document: `index.html`
7. Error document: `index.html`
8. Click "Create"

### **Step 4: Upload Files** (1 minute)
1. Go to your bucket
2. Click "Upload"
3. Go to `dist/travel-booking/browser/`
4. Select ALL files
5. Click "Upload"

### **Step 5: Test** (30 seconds)
1. Go to bucket → Properties
2. Scroll to "Static website hosting"
3. Copy the URL
4. Open in browser

**Done!** Your site is live. 🎉

---

## 🔧 Advanced: Add CloudFront (10 minutes)

1. Go to CloudFront → Create Distribution
2. Origin: Select your S3 bucket
3. Viewer Protocol: Redirect HTTP to HTTPS
4. Default Root Object: `index.html`
5. Create Distribution
6. Wait 10 minutes
7. Use CloudFront URL (HTTPS enabled)

---

## 💰 Cost: ~$1/month

See `AWS_COST_ANALYSIS.md` for detailed breakdown.

---

## 🆘 Need Help?

Read full guide: `AWS_DEPLOYMENT_GUIDE.md`

