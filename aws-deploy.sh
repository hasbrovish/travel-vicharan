#!/bin/bash

# AWS Deployment Script for Travel Booking Application
# Usage: ./aws-deploy.sh

set -e  # Exit on error

# Configuration - UPDATE THESE VALUES
S3_BUCKET="your-travel-booking-app"
CLOUDFRONT_DISTRIBUTION_ID="YOUR_DISTRIBUTION_ID"
BUILD_DIR="dist/travel-booking/browser"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting AWS Deployment...${NC}"

# Step 1: Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Step 2: Check AWS credentials
echo -e "${YELLOW}📋 Checking AWS credentials...${NC}"
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Run 'aws configure' first.${NC}"
    exit 1
fi

# Step 3: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install --legacy-peer-deps

# Step 4: Build Angular application
echo -e "${YELLOW}🔨 Building Angular application for production...${NC}"
npm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Build failed! Build directory not found.${NC}"
    exit 1
fi

# Step 5: Upload to S3
echo -e "${YELLOW}📤 Uploading files to S3 bucket: $S3_BUCKET...${NC}"
aws s3 sync "$BUILD_DIR" "s3://$S3_BUCKET/" --delete --exclude "*.map" --exclude ".DS_Store"

# Check if upload was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files uploaded successfully!${NC}"
else
    echo -e "${RED}❌ Upload failed!${NC}"
    exit 1
fi

# Step 6: Invalidate CloudFront cache (optional, only if CloudFront is configured)
if [ "$CLOUDFRONT_DISTRIBUTION_ID" != "YOUR_DISTRIBUTION_ID" ]; then
    echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
    aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --paths "/*"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ CloudFront cache invalidation initiated!${NC}"
    else
        echo -e "${YELLOW}⚠️  CloudFront cache invalidation failed (non-critical)${NC}"
    fi
else
    echo -e "${YELLOW}⏭️  Skipping CloudFront invalidation (not configured)${NC}"
fi

# Step 7: Display S3 website URL
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${GREEN}📝 Next steps:${NC}"
echo "1. Visit your S3 website URL (check S3 bucket Properties > Static website hosting)"
echo "2. If using CloudFront, wait 5-10 minutes for distribution to update"
echo "3. Test all pages and functionality"
echo ""
echo -e "${YELLOW}💡 Tip: Set up billing alerts in AWS Console to monitor costs${NC}"

