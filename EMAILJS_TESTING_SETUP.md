# 📧 EmailJS Testing Setup - Quick Start

## 🎯 Testing Strategy

**For Now (Testing Phase):**
- Use: **jayantivishnoi31@gmail.com**
- All emails sent TO and FROM this address
- Easy to test and verify

**Later (Production):**
- Switch to: **VichranTrip.info@gmail.com**
- Just change one line in code
- No other changes needed

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Login to EmailJS
1. Go to: https://dashboard.emailjs.com/sign-in
2. **Email**: jayantivishnoi31@gmail.com
3. **Password**: Jayanti@123

---

### Step 2: Connect Gmail Service

1. Click **"Email Services"** → **"Add New Service"**
2. Choose **"Gmail"**
3. Click **"Connect Account"**
4. Sign in with: **jayantivishnoi31@gmail.com**
5. Allow EmailJS to send emails
6. **Copy Service ID** (looks like: `service_abc123`)

💡 **Write it here**: `service_________________`

---

### Step 3: Get Public Key

1. Click your profile (top right) → **"Account"**
2. Go to **"API Keys"** tab
3. **Copy Public Key** (looks like: `h8fk3j2h5k_xyz`)

💡 **Write it here**: `_________________`

---

### Step 4: Create Email Templates

You need 3 templates. I'll provide simplified versions:

#### Template 1: Booking Confirmation

1. **Email Templates** → **"Create New Template"**
2. **Template Name**: `Test Booking Confirmation`
3. **Subject**: `Booking Confirmed - {{booking_reference}}`
4. **Body** (paste this):

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #2d5a5f; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0;">VichranTrip</h1>
    <h2 style="margin: 10px 0;">Booking Confirmation</h2>
  </div>

  <div style="background: #f9f9f9; padding: 30px;">
    <h3 style="color: #2d5a5f;">Hi {{to_name}}!</h3>

    <div style="background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #ffc107;">
      <h4>Booking Reference</h4>
      <h2 style="color: #f97316; font-family: 'Courier New';">{{booking_reference}}</h2>
    </div>

    <div style="background: white; padding: 20px; margin: 20px 0;">
      <h4>Package Details</h4>
      <p><strong>Package:</strong> {{package_name}}</p>
      <p><strong>Departure:</strong> {{departure_date}}</p>
      <p><strong>City:</strong> {{departure_city}}</p>
      <p><strong>Passengers:</strong> {{number_of_passengers}}</p>
      <p><strong>Room:</strong> {{room_configuration}}</p>
    </div>

    <div style="background: white; padding: 20px; margin: 20px 0;">
      <h4>Payment Summary</h4>
      <p><strong>Payment:</strong> {{payment_option}}</p>
      <p><strong>Total:</strong> {{total_amount}}</p>
      <p><strong>Registration:</strong> {{registration_amount}}</p>
      <p><strong>Balance:</strong> {{balance_amount}}</p>
      <p><strong>Fee:</strong> {{convenience_fee}}</p>
    </div>
  </div>

  <div style="background: #2d5a5f; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
    <p>VichranTrip | Email: jayantivishnoi31@gmail.com</p>
  </div>
</body>
</html>
```

5. Click **Settings** tab → Add these parameters:
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

6. Click **"Test It"** → Send to jayantivishnoi31@gmail.com
7. **Save** template
8. **Copy Template ID**

💡 **Write it here**: `template_booking_________________`

---

#### Template 2: Enquiry Notification

1. Create New Template
2. **Name**: `Test Enquiry Alert`
3. **Subject**: `New Enquiry from {{from_name}}`
4. **Body**:

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0;">🔔 New Enquiry</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px;">
    <div style="background: white; padding: 20px; margin: 20px 0;">
      <h4>Customer Details</h4>
      <p><strong>Name:</strong> {{from_name}}</p>
      <p><strong>Email:</strong> {{from_email}}</p>
      <p><strong>Phone:</strong> {{from_phone}}</p>
    </div>

    <div style="background: white; padding: 20px; margin: 20px 0;">
      <h4>Package Interest</h4>
      <p><strong>Package:</strong> {{package_name}}</p>
      <p><strong>ID:</strong> {{package_id}}</p>
    </div>

    <div style="background: white; padding: 20px; margin: 20px 0;">
      <h4>Message</h4>
      <p>{{enquiry_message}}</p>
    </div>

    <div style="background: #fee2e2; padding: 20px; margin: 20px 0; border-left: 4px solid #dc2626;">
      <p><strong>Enquiry ID:</strong> {{enquiry_id}}</p>
      <p><strong>Date:</strong> {{enquiry_date}}</p>
    </div>

    <div style="text-align: center; margin: 20px 0;">
      <a href="mailto:{{from_email}}" style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Reply to Customer
      </a>
    </div>
  </div>
</body>
</html>
```

5. Add parameters:
   ```
   from_name
   from_email
   from_phone
   package_name
   package_id
   enquiry_message
   enquiry_id
   enquiry_date
   ```

6. Test & Save
7. **Copy Template ID**

💡 **Write it here**: `template_enquiry_________________`

---

#### Template 3: Newsletter Welcome

1. Create New Template
2. **Name**: `Test Newsletter`
3. **Subject**: `Welcome! Your 10% Discount: {{discount_code}}`
4. **Body**:

```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0;">🎉 Welcome to VichranTrip!</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px;">
    <div style="background: white; padding: 30px; margin: 20px 0; border-radius: 10px;">
      <h2 style="color: #059669; text-align: center;">Your Exclusive Discount Code</h2>
      <div style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); padding: 30px; text-align: center; border-radius: 10px; margin: 20px 0;">
        <h1 style="color: #059669; font-size: 36px; letter-spacing: 5px; margin: 0; font-family: 'Courier New';">{{discount_code}}</h1>
        <p style="color: #047857; font-weight: 600; margin: 10px 0 0 0;">Get {{discount_percent}}% OFF!</p>
      </div>
      <p style="text-align: center; color: #64748b;">Valid until: {{valid_until}}</p>
    </div>

    <div style="background: white; padding: 25px; margin: 20px 0; border-radius: 10px;">
      <h3 style="color: #059669;">What You'll Get:</h3>
      <ul style="line-height: 2;">
        <li>✅ Early access to new packages</li>
        <li>✅ Exclusive seasonal offers</li>
        <li>✅ Travel tips & guides</li>
        <li>✅ Priority support</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{website_url}}" style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: 600;">
        Explore Packages Now →
      </a>
    </div>
  </div>

  <div style="background: #1e5558; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
    <p>VichranTrip | Email: jayantivishnoi31@gmail.com</p>
  </div>
</body>
</html>
```

5. Add parameters:
   ```
   to_email
   discount_code
   discount_percent
   valid_until
   website_url
   ```

6. Test & Save
7. **Copy Template ID**

💡 **Write it here**: `template_newsletter_________________`

---

### Step 5: Update Code

Once you have all 5 IDs, paste them here and I'll update the code for you!

**Your IDs:**
```
Service ID: ___________________
Public Key: ___________________
Booking Template ID: ___________________
Enquiry Template ID: ___________________
Newsletter Template ID: ___________________
```

---

## 🧪 After Setup - Testing

1. **Build**:
   ```bash
   cd travel-booking
   npm run build
   ```

2. **Run**:
   ```bash
   npm start
   ```

3. **Test Booking**:
   - Go to any package
   - Click "Book Now"
   - Fill and submit
   - Check jayantivishnoi31@gmail.com inbox ✅

4. **Test Enquiry**:
   - Fill enquiry form
   - Check jayantivishnoi31@gmail.com inbox ✅

5. **Test Newsletter**:
   - Subscribe with any email
   - Check that email's inbox ✅

---

## 🔄 Later: Switch to VichranTrip.info@gmail.com

When ready for production, just update ONE line in code:

**File**: `src/app/services/email.service.ts` (line 27)

**Change from**:
```typescript
toEmail: 'jayantivishnoi31@gmail.com'
```

**Change to**:
```typescript
toEmail: 'VichranTrip.info@gmail.com'
```

Also reconnect Gmail service in EmailJS dashboard with VichranTrip.info@gmail.com

That's it! All emails will now go to your business email.

---

## ✅ Quick Checklist

- [ ] Logged into EmailJS
- [ ] Connected Gmail (jayantivishnoi31@gmail.com)
- [ ] Got Service ID
- [ ] Got Public Key
- [ ] Created 3 templates
- [ ] Got all 3 Template IDs
- [ ] Ready to paste IDs

**Ready? Share your 5 IDs and I'll update the code! 🚀**
