# 📧 EmailJS Integration Guide for VichranTrip

Complete guide to integrate your EmailJS account with VichranTrip booking system.

## 📋 Prerequisites

- EmailJS account (you already have this!)
- Gmail account: VichranTrip.info@gmail.com

---

## 🚀 Step-by-Step Setup

### Step 1: Get Your EmailJS Credentials

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Login with your account

#### Get Service ID
1. Click **Email Services** in left sidebar
2. Click **Add New Service**
3. Choose **Gmail** as service
4. Connect your Gmail account: `VichranTrip.info@gmail.com`
5. Copy the **Service ID** (e.g., `service_abc123`)

#### Get Public Key (User ID)
1. Click **Account** in left sidebar
2. Go to **API Keys** tab
3. Copy your **Public Key** (e.g., `h8fk3j2h5k_abc123`)

---

### Step 2: Create Email Templates

You need to create **3 email templates** in EmailJS dashboard.

#### Template 1: Booking Confirmation Email

1. Go to **Email Templates** → **Create New Template**
2. **Template Name**: `Booking Confirmation`
3. **Template Content**:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - VichranTrip</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2d5a5f 0%, #3d7a7f 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px;">VichranTrip</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Your Journey Awaits!</p>
                        </td>
                    </tr>

                    <!-- Success Badge -->
                    <tr>
                        <td style="padding: 30px; text-align: center; background: #f0f9ff;">
                            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: inline-block; padding: 15px 30px; border-radius: 50px; box-shadow: 0 4px 12px rgba(16,185,129,0.3);">
                                <span style="color: #ffffff; font-size: 18px; font-weight: 600;">✓ Booking Confirmed!</span>
                            </div>
                        </td>
                    </tr>

                    <!-- Greeting -->
                    <tr>
                        <td style="padding: 30px 30px 20px;">
                            <h2 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 600;">Dear {{to_name}},</h2>
                            <p style="margin: 15px 0 0 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Thank you for choosing VichranTrip! Your booking has been successfully confirmed. Get ready for an unforgettable adventure!
                            </p>
                        </td>
                    </tr>

                    <!-- Booking Reference -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 12px; border-left: 5px solid #fbbf24; text-align: center;">
                                <p style="margin: 0 0 8px 0; color: #92400e; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Booking Reference</p>
                                <h1 style="margin: 0; color: #92400e; font-size: 32px; font-weight: 700; letter-spacing: 3px; font-family: 'Courier New', monospace;">{{booking_reference}}</h1>
                            </div>
                        </td>
                    </tr>

                    <!-- Package Details -->
                    <tr>
                        <td style="padding: 0 30px 20px;">
                            <div style="background: #f9fafb; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                                <h3 style="margin: 0 0 20px 0; color: #2d5a5f; font-size: 18px; font-weight: 600; border-bottom: 2px solid #5eb8c8; padding-bottom: 10px;">
                                    📦 Package Details
                                </h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; width: 40%;">Package</td>
                                        <td style="padding: 12px 0; color: #111827; font-size: 15px; font-weight: 600;">{{package_name}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; border-top: 1px solid #e5e7eb;">Departure Date</td>
                                        <td style="padding: 12px 0; color: #111827; font-size: 15px; font-weight: 600; border-top: 1px solid #e5e7eb;">{{departure_date}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; border-top: 1px solid #e5e7eb;">Departure City</td>
                                        <td style="padding: 12px 0; color: #111827; font-size: 15px; font-weight: 600; border-top: 1px solid #e5e7eb;">{{departure_city}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; border-top: 1px solid #e5e7eb;">Passengers</td>
                                        <td style="padding: 12px 0; color: #111827; font-size: 15px; font-weight: 600; border-top: 1px solid #e5e7eb;">{{number_of_passengers}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; border-top: 1px solid #e5e7eb;">Room Configuration</td>
                                        <td style="padding: 12px 0; color: #111827; font-size: 15px; font-weight: 600; border-top: 1px solid #e5e7eb;">{{room_configuration}}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>

                    <!-- Payment Details -->
                    <tr>
                        <td style="padding: 0 30px 20px;">
                            <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border: 2px solid #86efac;">
                                <h3 style="margin: 0 0 20px 0; color: #047857; font-size: 18px; font-weight: 600; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                                    💰 Payment Summary
                                </h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 12px 0; color: #065f46; font-size: 14px; font-weight: 500;">Payment Option</td>
                                        <td style="padding: 12px 0; color: #047857; font-size: 15px; font-weight: 600; text-align: right;">{{payment_option}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #065f46; font-size: 14px; font-weight: 500; border-top: 1px solid #d1fae5;">Registration Amount</td>
                                        <td style="padding: 12px 0; color: #047857; font-size: 15px; font-weight: 600; text-align: right; border-top: 1px solid #d1fae5;">{{registration_amount}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #065f46; font-size: 14px; font-weight: 500; border-top: 1px solid #d1fae5;">Balance Amount</td>
                                        <td style="padding: 12px 0; color: #047857; font-size: 15px; font-weight: 600; text-align: right; border-top: 1px solid #d1fae5;">{{balance_amount}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #065f46; font-size: 14px; font-weight: 500; border-top: 1px solid #d1fae5;">Convenience Fee</td>
                                        <td style="padding: 12px 0; color: #047857; font-size: 15px; font-weight: 600; text-align: right; border-top: 1px solid #d1fae5;">{{convenience_fee}}</td>
                                    </tr>
                                    <tr style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);">
                                        <td style="padding: 15px 10px; color: #047857; font-size: 16px; font-weight: 700; border-top: 2px solid #10b981; border-radius: 8px 0 0 8px;">Total Amount</td>
                                        <td style="padding: 15px 10px; color: #047857; font-size: 20px; font-weight: 700; text-align: right; border-top: 2px solid #10b981; border-radius: 0 8px 8px 0;">{{total_amount}}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>

                    <!-- Important Notes -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <div style="background: #fff7ed; padding: 20px; border-radius: 12px; border-left: 5px solid #fb923c;">
                                <h4 style="margin: 0 0 12px 0; color: #ea580c; font-size: 16px; font-weight: 600;">⚠️ Important Information</h4>
                                <ul style="margin: 0; padding-left: 20px; color: #7c2d12; font-size: 14px; line-height: 1.8;">
                                    <li>Save this booking reference for future correspondence</li>
                                    <li>You will receive further travel details 7 days before departure</li>
                                    <li>Please review our cancellation policy on our website</li>
                                    <li>For any queries, contact us at VichranTrip.info@gmail.com</li>
                                </ul>
                            </div>
                        </td>
                    </tr>

                    <!-- Call to Action -->
                    <tr>
                        <td style="padding: 0 30px 40px; text-align: center;">
                            <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 15px;">Need to manage your booking?</p>
                            <a href="https://yourwebsite.com/my-bookings" style="display: inline-block; background: linear-gradient(135deg, #2d5a5f 0%, #5eb8c8 100%); color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(45,90,95,0.3); transition: all 0.3s;">
                                View My Bookings →
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #1f2937; padding: 30px; text-align: center;">
                            <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 20px; font-weight: 600;">VichranTrip</h3>
                            <p style="margin: 0 0 8px 0; color: #d1d5db; font-size: 14px;">Your Trusted Travel Partner</p>
                            <p style="margin: 0 0 15px 0; color: #9ca3af; font-size: 13px;">
                                📧 VichranTrip.info@gmail.com | 📞 1800 313 5555
                            </p>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #374151;">
                                <a href="#" style="color: #60a5fa; text-decoration: none; margin: 0 10px; font-size: 12px;">Terms of Service</a>
                                <span style="color: #6b7280;">|</span>
                                <a href="#" style="color: #60a5fa; text-decoration: none; margin: 0 10px; font-size: 12px;">Privacy Policy</a>
                                <span style="color: #6b7280;">|</span>
                                <a href="#" style="color: #60a5fa; text-decoration: none; margin: 0 10px; font-size: 12px;">Contact Us</a>
                            </div>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

**Template Variables** (Settings → Template Parameters):
- `to_name` - Customer name
- `to_email` - Customer email
- `booking_reference` - Booking reference number
- `package_name` - Tour package name
- `departure_date` - Departure date
- `departure_city` - Departure city
- `number_of_passengers` - Total passengers
- `room_configuration` - Room type
- `payment_option` - Payment method
- `total_amount` - Total cost
- `registration_amount` - Registration paid
- `balance_amount` - Balance due
- `convenience_fee` - Convenience fee

**Copy the Template ID** (e.g., `template_booking123`)

---

#### Template 2: Enquiry Notification Email

1. Create New Template
2. **Template Name**: `Enquiry Notification`
3. **Template Content**:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Enquiry - VichranTrip</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">🔔 New Enquiry Alert</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">VichranTrip - Internal Notification</p>
                        </td>
                    </tr>

                    <!-- Alert Badge -->
                    <tr>
                        <td style="padding: 30px; text-align: center; background: #fef2f2;">
                            <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); display: inline-block; padding: 15px 30px; border-radius: 50px; box-shadow: 0 4px 12px rgba(251,191,36,0.3);">
                                <span style="color: #ffffff; font-size: 18px; font-weight: 600;">⚡ Requires Response</span>
                            </div>
                        </td>
                    </tr>

                    <!-- Enquiry Info -->
                    <tr>
                        <td style="padding: 30px 30px 20px;">
                            <div style="background: #eff6ff; padding: 20px; border-radius: 12px; border-left: 5px solid #3b82f6;">
                                <p style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Enquiry ID</p>
                                <h2 style="margin: 0; color: #1e3a8a; font-size: 24px; font-weight: 700; font-family: 'Courier New', monospace;">{{enquiry_id}}</h2>
                                <p style="margin: 10px 0 0 0; color: #60a5fa; font-size: 13px;">Received on {{enquiry_date}}</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Customer Details -->
                    <tr>
                        <td style="padding: 0 30px 20px;">
                            <div style="background: #f9fafb; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                                <h3 style="margin: 0 0 20px 0; color: #dc2626; font-size: 18px; font-weight: 600; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
                                    👤 Customer Details
                                </h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; width: 35%;">Name</td>
                                        <td style="padding: 12px 0; color: #111827; font-size: 15px; font-weight: 600;">{{from_name}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; border-top: 1px solid #e5e7eb;">Email</td>
                                        <td style="padding: 12px 0; border-top: 1px solid #e5e7eb;">
                                            <a href="mailto:{{from_email}}" style="color: #2563eb; font-size: 15px; font-weight: 600; text-decoration: none;">{{from_email}}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 500; border-top: 1px solid #e5e7eb;">Phone</td>
                                        <td style="padding: 12px 0; border-top: 1px solid #e5e7eb;">
                                            <a href="tel:{{from_phone}}" style="color: #2563eb; font-size: 15px; font-weight: 600; text-decoration: none;">{{from_phone}}</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>

                    <!-- Package Interest -->
                    <tr>
                        <td style="padding: 0 30px 20px;">
                            <div style="background: #fef3c7; padding: 25px; border-radius: 12px; border: 2px solid #fbbf24;">
                                <h3 style="margin: 0 0 20px 0; color: #92400e; font-size: 18px; font-weight: 600; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
                                    📦 Package Interest
                                </h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 12px 0; color: #78350f; font-size: 14px; font-weight: 500; width: 35%;">Package Name</td>
                                        <td style="padding: 12px 0; color: #92400e; font-size: 15px; font-weight: 600;">{{package_name}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; color: #78350f; font-size: 14px; font-weight: 500; border-top: 1px solid #fde68a;">Package ID</td>
                                        <td style="padding: 12px 0; color: #92400e; font-size: 15px; font-weight: 600; border-top: 1px solid #fde68a;">{{package_id}}</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>

                    <!-- Customer Message -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border: 2px solid #86efac;">
                                <h3 style="margin: 0 0 15px 0; color: #047857; font-size: 18px; font-weight: 600;">💬 Customer Message</h3>
                                <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                                    <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">{{enquiry_message}}</p>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <!-- Action Required -->
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <div style="background: #fee2e2; padding: 20px; border-radius: 12px; border-left: 5px solid #dc2626;">
                                <h4 style="margin: 0 0 12px 0; color: #991b1b; font-size: 16px; font-weight: 600;">⚠️ Action Required</h4>
                                <ul style="margin: 0; padding-left: 20px; color: #7f1d1d; font-size: 14px; line-height: 1.8;">
                                    <li>Respond to customer within 24 hours</li>
                                    <li>Send personalized package details</li>
                                    <li>Follow up with a phone call if needed</li>
                                    <li>Update CRM with enquiry details</li>
                                </ul>
                            </div>
                        </td>
                    </tr>

                    <!-- Quick Actions -->
                    <tr>
                        <td style="padding: 0 30px 40px; text-align: center;">
                            <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 15px;">Quick Actions</p>
                            <div style="margin-bottom: 10px;">
                                <a href="mailto:{{from_email}}" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px; margin: 5px; box-shadow: 0 4px 12px rgba(37,99,235,0.3);">
                                    📧 Reply via Email
                                </a>
                                <a href="tel:{{from_phone}}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px; margin: 5px; box-shadow: 0 4px 12px rgba(16,185,129,0.3);">
                                    📞 Call Customer
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #1f2937; padding: 30px; text-align: center;">
                            <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 18px; font-weight: 600;">VichranTrip - Internal System</h3>
                            <p style="margin: 0; color: #9ca3af; font-size: 13px;">This is an automated notification. Do not reply to this email.</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

**Template Variables**:
- `to_email` - VichranTrip.info@gmail.com
- `to_name` - VichranTrip Team
- `from_name` - Customer name
- `from_email` - Customer email
- `from_phone` - Customer phone
- `package_name` - Package interested in
- `package_id` - Package ID
- `enquiry_message` - Customer message
- `enquiry_id` - Enquiry reference
- `enquiry_date` - Submission date

**Copy the Template ID**

---

#### Template 3: Newsletter Welcome Email

1. Create New Template
2. **Template Name**: `Newsletter Welcome`
3. **Use the template already in your code** (lines 343-403 in email.service.ts)
4. **Copy the Template ID**

---

### Step 3: Update Configuration in Code

Now update your `email.service.ts` file:

```typescript
// Around line 21-28
private readonly EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',           // ← Paste Service ID from Step 1
  templateId_booking: 'YOUR_TEMPLATE_ID',  // ← Paste Booking Template ID
  templateId_newsletter: 'YOUR_TEMPLATE_ID', // ← Paste Newsletter Template ID
  templateId_enquiry: 'YOUR_TEMPLATE_ID',  // ← Paste Enquiry Template ID
  userId: 'YOUR_PUBLIC_KEY',              // ← Paste Public Key from Step 1
  toEmail: 'VichranTrip.info@gmail.com'
};

// Around line 32
private readonly USE_REAL_EMAILS = true; // ← Change to true
```

---

### Step 4: Test Your Setup

1. **Build the project**:
```bash
npm run build
```

2. **Run the development server**:
```bash
npm start
```

3. **Test booking flow**:
   - Go to a package
   - Make a test booking
   - Check your email (VichranTrip.info@gmail.com)
   - Check customer email

4. **Check EmailJS Dashboard**:
   - Go to **Email History**
   - Verify emails are being sent

---

## 📊 EmailJS Dashboard Features

### Monitor Email Status
- **Email History**: View all sent emails
- **Failed Emails**: Check delivery failures
- **Statistics**: Track email metrics

### Email Limits
- **Free Plan**: 200 emails/month
- **Upgrade if needed**: Check pricing for more emails

---

## 🔧 Troubleshooting

### Emails not sending?

1. **Check Console**: Look for EmailJS errors in browser console
2. **Verify IDs**: Double-check all Service ID, Template IDs, and Public Key
3. **Gmail Connection**: Ensure Gmail is connected in EmailJS dashboard
4. **Template Variables**: Make sure all {{variable}} names match exactly

### Common Issues:

**Error: "Service ID is invalid"**
- Solution: Copy Service ID again from EmailJS dashboard

**Error: "Template not found"**
- Solution: Verify template IDs are correct

**Error: "User ID is invalid"**
- Solution: Copy Public Key from Account → API Keys

---

## 🎨 Customizing Email Templates

You can customize the templates in EmailJS dashboard:

1. Go to **Email Templates**
2. Click on template to edit
3. Modify HTML, colors, content
4. Click **Save**
5. No code changes needed!

---

## ✅ Final Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] 3 email templates created
- [ ] Service ID copied
- [ ] All Template IDs copied
- [ ] Public Key copied
- [ ] Configuration updated in `email.service.ts`
- [ ] `USE_REAL_EMAILS = true`
- [ ] Application tested
- [ ] Test emails received successfully

---

## 📞 Support

If you face any issues:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Your team support: Check the console for detailed error messages

---

**Happy Emailing! 📧✨**
