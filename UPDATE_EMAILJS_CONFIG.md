# 🚀 Update EmailJS Configuration

## Step 1: Get Your EmailJS Credentials

### A. Login to EmailJS
1. Visit: https://dashboard.emailjs.com/sign-in
2. Login with: jayantivishnoi31@gmail.com
3. Password: Jayanti@123

---

### B. Get Service ID

**If you already have a Gmail service:**
1. Click **"Email Services"** in left sidebar
2. You'll see your existing service
3. Copy the **Service ID** (looks like: `service_abc123`)

**If you don't have a service yet:**
1. Click **"Email Services"** → **"Add New Service"**
2. Choose **"Gmail"**
3. Click **"Connect Account"**
4. Sign in with **VichranTrip.info@gmail.com** (or jayantivishnoi31@gmail.com)
5. Allow EmailJS to send emails on your behalf
6. Copy the **Service ID** that appears

---

### C. Get Public Key (User ID)

1. Click your profile icon (top right)
2. Select **"Account"**
3. Go to **"API Keys"** tab
4. Your Public Key will be displayed (looks like: `h8fk3j2h5k_xyz123`)
5. Copy this key

---

### D. Create Email Templates

You need 3 templates. For each one:

#### Template 1: Booking Confirmation
1. Go to **"Email Templates"** → **"Create New Template"**
2. **Template Name**: `VichranTrip - Booking Confirmation`
3. **Subject**: `Booking Confirmed! Your VichranTrip Adventure Awaits 🎉`
4. Copy the HTML from **EMAILJS_INTEGRATION_GUIDE.md** (search for "Template 1: Booking Confirmation")
5. In the **Settings** tab, add these variables:
   ```
   to_name
   to_email
   booking_reference
   package_name
   departure_date
   departure_city
   number_of_passengers
   room_configuration
   payment_option
   total_amount
   registration_amount
   balance_amount
   convenience_fee
   ```
6. Click **"Test It"** to send a test email
7. **Save** the template
8. **Copy the Template ID** from the top (looks like: `template_booking123`)

#### Template 2: Enquiry Notification
1. Create New Template
2. **Template Name**: `VichranTrip - New Enquiry Alert`
3. **Subject**: `🔔 New Customer Enquiry - {{from_name}}`
4. Copy HTML from guide (Template 2)
5. Add variables (see guide)
6. Test and Save
7. **Copy Template ID**

#### Template 3: Newsletter Welcome
1. Create New Template
2. **Template Name**: `VichranTrip - Newsletter Welcome`
3. **Subject**: `Welcome to VichranTrip! 🎁 Your 10% Discount Inside`
4. Copy HTML from guide (Template 3)
5. Add variables (see guide)
6. Test and Save
7. **Copy Template ID**

---

## Step 2: Update Your Code

Once you have all the IDs, update the file:
`src/app/services/email.service.ts`

### Find lines 21-28 and replace with your IDs:

```typescript
private readonly EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID_HERE',              // ← Paste your Service ID
  templateId_booking: 'YOUR_BOOKING_TEMPLATE_ID',  // ← Paste Booking Template ID
  templateId_newsletter: 'YOUR_NEWSLETTER_TEMPLATE_ID', // ← Paste Newsletter Template ID
  templateId_enquiry: 'YOUR_ENQUIRY_TEMPLATE_ID',  // ← Paste Enquiry Template ID
  userId: 'YOUR_PUBLIC_KEY_HERE',                 // ← Paste your Public Key
  toEmail: 'VichranTrip.info@gmail.com'
};
```

### Find line 32 and change to true:

```typescript
private readonly USE_REAL_EMAILS = true;  // ← CHANGE FROM false TO true
```

---

## Step 3: Rebuild and Test

```bash
# Navigate to project
cd travel-booking

# Rebuild
npm run build

# Run development server
npm start
```

---

## 📋 Quick Copy-Paste Format

Once you have your IDs, you can copy-paste this format:

```typescript
// EXAMPLE - Replace with your actual IDs
private readonly EMAILJS_CONFIG = {
  serviceId: 'service_abc123',
  templateId_booking: 'template_xyz789',
  templateId_newsletter: 'template_news456',
  templateId_enquiry: 'template_enq012',
  userId: 'h8fk3j2h5k_abc123',
  toEmail: 'VichranTrip.info@gmail.com'
};

private readonly USE_REAL_EMAILS = true;
```

---

## ✅ Verification Steps

After updating:

1. **Build without errors**:
   ```bash
   npm run build
   ```

2. **Test booking flow**:
   - Navigate to a package
   - Click "Book Now"
   - Fill in booking details
   - Submit booking
   - Check your email!

3. **Test enquiry**:
   - Fill out enquiry form
   - Check VichranTrip.info@gmail.com

4. **Test newsletter**:
   - Subscribe to newsletter
   - Check subscriber email for discount code

---

## 🐛 Troubleshooting

### Check Browser Console
Press F12 → Console tab → Look for errors

### Common Issues:

**"Service ID is invalid"**
- Double-check you copied the entire Service ID
- Make sure there are no extra spaces

**"Template not found"**
- Verify template IDs are correct
- Make sure you saved the templates

**"User ID is invalid"**
- Re-copy the Public Key from Account → API Keys
- Check for any trailing spaces

**Emails not sending**
- Check EmailJS dashboard → Email History
- Look for failed emails
- Verify Gmail service is connected and active

---

## 📊 Monitor Your Emails

After setup, you can monitor in EmailJS dashboard:

1. **Email History** - See all sent emails
2. **Statistics** - Track delivery rates
3. **Failed Emails** - Debug issues

---

## 🎯 Free Plan Limits

- **200 emails/month** on free plan
- If you need more, upgrade at: https://dashboard.emailjs.com/admin/pricing

---

## 📞 Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Check the detailed guide: EMAILJS_INTEGRATION_GUIDE.md

---

**Once you get your IDs, paste them here and I'll help you update the code! 🚀**
