# 📧 EmailJS Final Setup Guide - VichranTrip

## ✅ Email Configuration Strategy

### Your EmailJS Account
- **Login Email**: jayantivishnoi31@gmail.com
- **Password**: Jayanti@123
- **Dashboard**: https://dashboard.emailjs.com/

### Business Email for Receiving Notifications
- **VichranTrip Email**: VichranTrip.info@gmail.com
- **Purpose**: Receive all booking confirmations, enquiries, and notifications

---

## 📬 Email Flow Overview

### 1. Booking Confirmation Emails
**From**: VichranTrip.info@gmail.com (via EmailJS)
**To**: Customer's email address
**Content**: Booking details, reference number, payment summary

### 2. Enquiry Notification Emails
**From**: VichranTrip.info@gmail.com (via EmailJS)
**To**: VichranTrip.info@gmail.com (internal notification)
**Content**: Customer enquiry details, contact info, message

### 3. Newsletter Welcome Emails
**From**: VichranTrip.info@gmail.com (via EmailJS)
**To**: Subscriber's email
**Content**: Welcome message, discount code

---

## 🚀 Quick Setup Steps

### Step 1: Login to EmailJS
1. Go to: https://dashboard.emailjs.com/sign-in
2. **Email**: jayantivishnoi31@gmail.com
3. **Password**: Jayanti@123

---

### Step 2: Connect Gmail Service

1. Click **"Email Services"** in left sidebar
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**

**IMPORTANT: Choose which Gmail to connect:**

**Option A: Use VichranTrip.info@gmail.com (RECOMMENDED)**
- All emails will be sent from VichranTrip.info@gmail.com
- More professional for customers
- Better branding

**Option B: Use jayantivishnoi31@gmail.com**
- Emails sent from your personal account
- May appear less professional

**Recommendation**: Connect **VichranTrip.info@gmail.com**

5. Sign in with the chosen Gmail account
6. Grant EmailJS permission to send emails
7. **Copy the Service ID** (e.g., `service_abc123`)

---

### Step 3: Get Your Public Key

1. Click profile icon (top right) → **"Account"**
2. Go to **"API Keys"** tab
3. **Copy your Public Key** (e.g., `h8fk3j2h5k_xyz`)

---

### Step 4: Create 3 Email Templates

#### Template 1: Booking Confirmation ✅

**Purpose**: Sent to customers after booking

1. **Email Templates** → **"Create New Template"**
2. **Name**: `VichranTrip Booking Confirmation`
3. **Subject**: `✈️ Booking Confirmed - {{booking_reference}} | VichranTrip`

**Email Content** (Copy the HTML from `EMAILJS_INTEGRATION_GUIDE.md` - Template 1)

**Template Parameters** (Add in Settings):
```
to_name - Customer name
to_email - Customer email
booking_reference - Booking ref number
package_name - Tour package name
departure_date - Departure date
departure_city - City
number_of_passengers - Total passengers
room_configuration - Room type
payment_option - Payment method
total_amount - Total amount
registration_amount - Registration paid
balance_amount - Balance due
convenience_fee - Fee amount
reply_to - VichranTrip.info@gmail.com
```

**Test Email**:
- Click "Test It"
- Send to your email to verify

**Save & Copy Template ID**

---

#### Template 2: Enquiry Notification 📧

**Purpose**: Notify VichranTrip when customer enquires

1. Create New Template
2. **Name**: `VichranTrip Enquiry Alert`
3. **Subject**: `🔔 New Enquiry from {{from_name}} | VichranTrip`

**Email Content** (Copy from `EMAILJS_INTEGRATION_GUIDE.md` - Template 2)

**Template Parameters**:
```
to_email - VichranTrip.info@gmail.com (hardcoded)
to_name - VichranTrip Team
from_name - Customer name
from_email - Customer email
from_phone - Customer phone
package_name - Package interested
package_id - Package ID
enquiry_message - Customer message
enquiry_id - Enquiry ID
enquiry_date - Date submitted
reply_to - Customer email (for easy reply)
```

**Important**: In template body, set:
- **To Email**: VichranTrip.info@gmail.com (you'll receive all enquiries here)

**Save & Copy Template ID**

---

#### Template 3: Newsletter Welcome 🎁

**Purpose**: Welcome new subscribers with discount

1. Create New Template
2. **Name**: `VichranTrip Newsletter Welcome`
3. **Subject**: `Welcome to VichranTrip! 🎁 Your 10% Discount Code Inside`

**Email Content** (Copy from `EMAILJS_INTEGRATION_GUIDE.md` - Template 3)

**Template Parameters**:
```
to_email - Subscriber email
to_name - Subscriber name
discount_code - Generated code
discount_percent - 10
valid_until - Expiry date
website_url - Your website URL
reply_to - VichranTrip.info@gmail.com
```

**Save & Copy Template ID**

---

### Step 5: Update Configuration in Code

Open: `travel-booking/src/app/services/email.service.ts`

**Find lines 21-28** and update:

```typescript
private readonly EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',           // ← Paste from Step 2
  templateId_booking: 'YOUR_TEMPLATE_ID',  // ← Paste Template 1 ID
  templateId_newsletter: 'YOUR_TEMPLATE_ID', // ← Paste Template 3 ID
  templateId_enquiry: 'YOUR_TEMPLATE_ID',  // ← Paste Template 2 ID
  userId: 'YOUR_PUBLIC_KEY',              // ← Paste from Step 3
  toEmail: 'VichranTrip.info@gmail.com'   // ✅ Already set correctly
};
```

**Find line 32** and enable real emails:

```typescript
private readonly USE_REAL_EMAILS = true;  // ← Change from false to true
```

---

## 📊 What Happens After Setup?

### When Customer Books a Package:
1. Customer fills booking form
2. ✅ Booking confirmation email sent to **customer's email**
3. ✅ Internal notification sent to **VichranTrip.info@gmail.com**
4. Customer receives beautiful branded email with booking details

### When Customer Sends Enquiry:
1. Customer fills enquiry form
2. ✅ Alert email sent to **VichranTrip.info@gmail.com**
3. You can reply directly from Gmail
4. Email contains all customer contact info

### When User Subscribes to Newsletter:
1. User enters email in newsletter form
2. ✅ Welcome email sent to **subscriber's email**
3. Email contains 10% discount code
4. Valid for 90 days

---

## 🎯 Email Sending Limits

### Free EmailJS Plan:
- **200 emails/month** free
- Sufficient for starting out
- Monitor usage in dashboard

### If You Need More:
- Check pricing: https://dashboard.emailjs.com/admin/pricing
- Upgrade to higher plan

---

## ✅ Complete Setup Checklist

Before you start, make sure you have:
- [ ] Access to jayantivishnoi31@gmail.com (EmailJS login)
- [ ] Access to VichranTrip.info@gmail.com (for Gmail service)
- [ ] Both passwords ready

**Setup Process:**
- [ ] Logged into EmailJS dashboard
- [ ] Connected Gmail service (VichranTrip.info@gmail.com)
- [ ] Copied Service ID
- [ ] Copied Public Key
- [ ] Created Booking Confirmation template
- [ ] Created Enquiry Notification template
- [ ] Created Newsletter Welcome template
- [ ] Copied all 3 Template IDs
- [ ] Updated email.service.ts with all IDs
- [ ] Set USE_REAL_EMAILS = true
- [ ] Ran `npm run build` successfully
- [ ] Tested booking flow
- [ ] Verified emails received

---

## 🧪 Testing Your Setup

### Test 1: Booking Confirmation
```bash
npm start
# Go to http://localhost:4200
# Navigate to any package
# Click "Book Now"
# Fill form and submit
# Check customer email inbox
```

### Test 2: Enquiry Notification
```bash
# Fill enquiry form on website
# Check VichranTrip.info@gmail.com inbox
```

### Test 3: Newsletter
```bash
# Subscribe to newsletter
# Check subscriber email inbox
```

---

## 📧 Email Addresses Summary

| Purpose | Email Address | Who Receives |
|---------|---------------|--------------|
| EmailJS Login | jayantivishnoi31@gmail.com | You (admin access) |
| Sending Service | VichranTrip.info@gmail.com | Configured in EmailJS |
| Booking Confirmations | customer@example.com | Customers |
| Enquiry Alerts | VichranTrip.info@gmail.com | You (business notifications) |
| Newsletter Welcome | subscriber@example.com | Subscribers |

---

## 🔧 Troubleshooting

### "Service ID is invalid"
- Re-copy Service ID from Email Services page
- Make sure no extra spaces

### "Gmail not connected"
- Go to Email Services
- Check if service shows as "Active"
- Reconnect if needed

### "Emails not sending"
- Check browser console (F12 → Console)
- Look for EmailJS errors
- Verify all IDs are correct
- Check EmailJS dashboard → Email History

### "Template not found"
- Verify Template IDs match exactly
- Check templates are saved and active

---

## 📝 Example Final Configuration

After setup, your `email.service.ts` should look like:

```typescript
private readonly EMAILJS_CONFIG = {
  serviceId: 'service_8j3k2h5',           // Your actual Service ID
  templateId_booking: 'template_booking123',
  templateId_newsletter: 'template_news456',
  templateId_enquiry: 'template_enq789',
  userId: 'h8fk3j2h5kL9mN3p',            // Your actual Public Key
  toEmail: 'VichranTrip.info@gmail.com'
};

private readonly USE_REAL_EMAILS = true;
```

---

## 🎉 You're All Set!

Once configured:
- ✅ Professional emails sent from VichranTrip.info@gmail.com
- ✅ Beautiful branded templates
- ✅ Automatic booking confirmations
- ✅ Instant enquiry notifications
- ✅ Newsletter automation with discount codes

---

## 📞 Support

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **EmailJS Support**: support@emailjs.com
- **Dashboard**: https://dashboard.emailjs.com/

---

**Need help getting your IDs? Share them when ready and I'll update the code for you! 🚀**
