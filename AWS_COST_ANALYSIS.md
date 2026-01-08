# 💰 AWS Cost Analysis - Travel Booking Application

**Prepared for:** Client Presentation  
**Date:** January 2025  
**Application:** Angular Travel Booking Platform

---

## 📊 Executive Summary

**Recommended Solution:** AWS S3 + CloudFront  
**Estimated Monthly Cost:** $1-25 (depending on traffic)  
**First Year:** Mostly covered by AWS Free Tier (~$0-1/month)

---

## 💵 Detailed Cost Breakdown

### **Scenario 1: Low Traffic (< 10,000 visitors/month)**

**Typical for:** New website, testing phase

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| S3 Storage (50 MB) | 50 MB | $0.001 |
| S3 Requests | 10,000 GET | $0.0004 |
| CloudFront Data Transfer | 5 GB | $0.50 |
| CloudFront Requests | 10,000 HTTPS | $0.0075 |
| Route 53 DNS | 1 hosted zone | $0.50 |
| **TOTAL** | | **$1.01/month** |

**First Year (with Free Tier):** ~$0.50/month

---

### **Scenario 2: Medium Traffic (50,000 visitors/month)**

**Typical for:** Established website, regular business

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| S3 Storage (50 MB) | 50 MB | $0.001 |
| S3 Requests | 50,000 GET | $0.002 |
| CloudFront Data Transfer | 25 GB | $2.25 |
| CloudFront Requests | 50,000 HTTPS | $0.0375 |
| Route 53 DNS | 1 hosted zone | $0.50 |
| **TOTAL** | | **$2.79/month** |

**First Year (with Free Tier):** ~$1.50/month

---

### **Scenario 3: High Traffic (500,000 visitors/month)**

**Typical for:** Popular website, peak season

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| S3 Storage (50 MB) | 50 MB | $0.001 |
| S3 Requests | 500,000 GET | $0.02 |
| CloudFront Data Transfer | 250 GB | $21.00 |
| CloudFront Requests | 500,000 HTTPS | $0.375 |
| Route 53 DNS | 1 hosted zone | $0.50 |
| **TOTAL** | | **$21.90/month** |

**First Year (with Free Tier):** ~$15/month

---

## 🎁 AWS Free Tier (First 12 Months)

### **What's Included:**

| Service | Free Tier Limit | Value |
|---------|----------------|-------|
| **S3 Storage** | 5 GB | $0.12/month |
| **S3 Requests** | 20,000 GET requests | $0.008/month |
| **CloudFront** | 1 TB data transfer | $85/month value |
| **CloudFront Requests** | 10,000,000 requests | $7.50/month value |
| **Route 53** | 1 hosted zone | $0.50/month |

**Total Free Tier Value:** ~$93/month

**Your Actual Cost (Low Traffic):** $0-1/month for first year

---

## 📈 Cost Projection (3 Years)

### **Low Traffic Scenario:**

| Year | Monthly Cost | Annual Cost |
|------|--------------|-------------|
| Year 1 | $0.50 | $6.00 |
| Year 2 | $1.00 | $12.00 |
| Year 3 | $1.00 | $12.00 |
| **Total** | | **$30.00** |

### **Medium Traffic Scenario:**

| Year | Monthly Cost | Annual Cost |
|------|--------------|-------------|
| Year 1 | $1.50 | $18.00 |
| Year 2 | $2.80 | $33.60 |
| Year 3 | $2.80 | $33.60 |
| **Total** | | **$85.20** |

### **High Traffic Scenario:**

| Year | Monthly Cost | Annual Cost |
|------|--------------|-------------|
| Year 1 | $15.00 | $180.00 |
| Year 2 | $21.90 | $262.80 |
| Year 3 | $21.90 | $262.80 |
| **Total** | | **$705.60** |

---

## 💡 Cost Optimization Tips

### **1. Enable CloudFront Compression**
- **Savings:** 50-70% reduction in data transfer
- **Action:** Enable Gzip compression in CloudFront
- **Impact:** Reduces costs by ~$10-15/month for high traffic

### **2. Optimize Images**
- **Savings:** 60-80% reduction in file size
- **Action:** Convert images to WebP format
- **Impact:** Reduces storage and transfer costs

### **3. Set Up Caching**
- **Savings:** Reduces requests to origin
- **Action:** Configure CloudFront cache behaviors
- **Impact:** Lower S3 request costs

### **4. Use CloudFront Price Class**
- **Savings:** 20-30% reduction
- **Action:** Choose "Use only North America and Europe" if users are primarily there
- **Impact:** Saves ~$5-10/month

---

## 🔄 Alternative: AWS Amplify Pricing

### **Free Tier:**
- 1,000 build minutes/month
- 15 GB storage
- 5 GB served per month

### **Paid Tier:**
- $0.01 per build minute (after free tier)
- $0.023 per GB storage
- $0.15 per GB served

### **Estimated Cost:**
- **Low Traffic:** $5-10/month
- **Medium Traffic:** $15-25/month
- **High Traffic:** $50-100/month

**Verdict:** More expensive than S3+CloudFront, but includes CI/CD

---

## 📊 Comparison with Competitors

| Hosting Provider | Low Traffic | Medium Traffic | High Traffic |
|------------------|-------------|----------------|--------------|
| **AWS S3+CloudFront** | $1/month | $3/month | $22/month |
| **AWS Amplify** | $5/month | $15/month | $50/month |
| **Vercel** | Free | $20/month | $20/month |
| **Netlify** | Free | $19/month | $19/month |
| **GitHub Pages** | Free | Free | Free (limited) |

**Recommendation:** AWS S3+CloudFront offers best value for money

---

## ⚠️ Hidden Costs to Watch

### **1. Data Transfer Overages**
- **Risk:** Unexpected traffic spikes
- **Solution:** Set up CloudWatch alarms
- **Cost:** $0.085 per GB over free tier

### **2. Route 53 Queries**
- **Risk:** High DNS query volume
- **Solution:** Usually minimal ($0.40 per million queries)
- **Cost:** Negligible for most sites

### **3. CloudFront Invalidations**
- **Risk:** Frequent cache clears
- **Solution:** Limit invalidations
- **Cost:** $0.005 per invalidation path

---

## 🎯 Recommended Budget

### **For Client Presentation:**

**Initial Setup:**
- **One-time:** $0 (all free tier)
- **Monthly:** $1-5 (low traffic expected)

**Growth Phase (6-12 months):**
- **Monthly:** $3-10 (medium traffic)

**Mature Phase (12+ months):**
- **Monthly:** $10-25 (depending on success)

**Annual Budget Recommendation:** $50-300/year

---

## 📋 Cost Monitoring Setup

### **1. Billing Alerts**
Set up alerts at:
- $5/month (warning)
- $10/month (caution)
- $20/month (action required)

### **2. CloudWatch Metrics**
Monitor:
- CloudFront data transfer
- S3 requests
- Route 53 queries

### **3. Cost Explorer**
- Review monthly costs
- Identify cost trends
- Optimize spending

---

## ✅ Conclusion

**AWS S3 + CloudFront is the most cost-effective solution** for hosting your Angular travel booking application:

1. **Low initial cost:** $1-5/month
2. **Scales with traffic:** Pay only for what you use
3. **Free tier covers first year:** Mostly free
4. **Global CDN:** Fast worldwide
5. **Professional infrastructure:** Enterprise-grade reliability

**Recommendation:** Start with AWS S3+CloudFront, monitor costs, and optimize as traffic grows.

---

## 📞 Questions?

- **AWS Pricing Calculator:** https://calculator.aws/
- **AWS Support:** Basic (free), Developer ($29/month), Business ($100/month)
- **Documentation:** https://docs.aws.amazon.com/

