# 🚀 EmailJS Quick Setup - VichranTrip

## Your EmailJS Account
**Email**: jayantivishnoi31@gmail.com
**Password**: Jayanti@123

---

## ⚡ Quick Setup Steps

### 1. Login to EmailJS
1. Go to: https://dashboard.emailjs.com/sign-in
2. Login with: jayantivishnoi31@gmail.com
3. Password: Jayanti@123

---

### 2. Get Your Credentials

#### A) Get Service ID
1. Click **"Email Services"** in left sidebar
2. If you don't have a service yet:
   - Click **"Add New Service"**
   - Choose **"Gmail"**
   - Connect **VichranTrip.info@gmail.com** (or your sending email)
   - Service ID will look like: `service_abc1234`
3. **Copy the Service ID**

#### B) Get Public Key (User ID)
1. Click **"Account"** in left sidebar (top right profile icon)
2. Go to **"API Keys"** tab
3. Your Public Key will be shown (looks like: `h8fk3j2h5k`)
4. **Copy the Public Key**

---

### 3. Create 3 Email Templates

You need to create these templates in EmailJS dashboard:

#### Template 1: Booking Confirmation
1. Go to **"Email Templates"** → **"Create New Template"**
2. Name: `Booking Confirmation - VichranTrip`
3. Copy the HTML from **EMAILJS_INTEGRATION_GUIDE.md** (Template 1 section)
4. In **Settings** → Add these template parameters:
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
5. **Save** and **copy Template ID** (looks like: `template_abc123`)

#### Template 2: Enquiry Notification
1. Create New Template
2. Name: `Enquiry Notification - VichranTrip`
3. Copy HTML from guide (Template 2)
4. Add template parameters:
   ```
   to_email
   to_name
   from_name
   from_email
   from_phone
   package_name
   package_id
   enquiry_message
   enquiry_id
   enquiry_date
   ```
5. **Save** and **copy Template ID**

#### Template 3: Newsletter Welcome
1. Create New Template
2. Name: `Newsletter Welcome - VichranTrip`
3. Copy HTML from guide (Template 3) or use the one in email.service.ts
4. Add template parameters:
   ```
   to_email
   to_name
   discount_code
   discount_percent
   valid_until
   website_url
   ```
5. **Save** and **copy Template ID**

---

### 4. Update Your Code

Open: `src/app/services/email.service.ts`

Find lines 21-32 and update:

```typescript
private readonly EMAILJS_CONFIG = {
  serviceId: 'PASTE_YOUR_SERVICE_ID_HERE',              // From step 2A
  templateId_booking: 'PASTE_BOOKING_TEMPLATE_ID',      // From step 3.1
  templateId_newsletter: 'PASTE_NEWSLETTER_TEMPLATE_ID', // From step 3.3
  templateId_enquiry: 'PASTE_ENQUIRY_TEMPLATE_ID',      // From step 3.2
  userId: 'PASTE_YOUR_PUBLIC_KEY_HERE',                 // From step 2B
  toEmail: 'VichranTrip.info@gmail.com'
};

// Change this to true
private readonly USE_REAL_EMAILS = true;  // ← CHANGE THIS
```

---

### 5. Test It!

```bash
# Build
npm run build

# Run
npm start

# Test booking - emails should send automatically!
```

---

## 📝 Example Configuration

After you get your IDs, it should look like:

```typescript
private readonly EMAILJS_CONFIG = {
  serviceId: 'service_8j3k2h5',           // Example
  templateId_booking: 'template_booking123',
  templateId_newsletter: 'template_news456',
  templateId_enquiry: 'template_enq789',
  userId: 'h8fk3j2h5kL9mN3p',            // Example
  toEmail: 'VichranTrip.info@gmail.com'
};

private readonly USE_REAL_EMAILS = true;
```

---

## ✅ Verification Checklist

- [ ] Logged into EmailJS dashboard
- [ ] Gmail service connected
- [ ] Booking template created & ID copied
- [ ] Enquiry template created & ID copied
- [ ] Newsletter template created & ID copied
- [ ] Service ID copied from Email Services
- [ ] Public Key copied from Account → API Keys
- [ ] All IDs pasted in email.service.ts
- [ ] USE_REAL_EMAILS = true
- [ ] npm run build successful
- [ ] Test booking sent successfully

---

## 🎯 What Emails Will Be Sent?

1. **Booking Confirmation** → Sent to customer after booking
2. **Enquiry Notification** → Sent to VichranTrip.info@gmail.com when someone enquires
3. **Newsletter Welcome** → Sent to user when they subscribe

---

## 🔑 Important Notes

1. **Free EmailJS Plan**: 200 emails/month
2. **Sending Email**: VichranTrip.info@gmail.com (configure in Gmail service)
3. **Monitor**: Check Email History in EmailJS dashboard
4. **Errors**: Check browser console for detailed error messages

---

## 🆘 Need Help?

1. EmailJS Docs: https://www.emailjs.com/docs/
2. Check browser console for errors
3. Verify all IDs match exactly (copy-paste, don't type)
4. Make sure Gmail service is "Active" in dashboard

---

**Ready to send beautiful emails! 📧✨**

Next step: Login to EmailJS and get your credentials!
