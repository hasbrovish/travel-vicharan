# 🔧 Fix: Gmail API Insufficient Authentication Scopes

## ❌ Error You're Seeing

```
412 Gmail_API: Request had insufficient authentication scopes.
```

This means EmailJS doesn't have permission to send emails from your Gmail account.

---

## ✅ Solution: Reconnect Gmail Service

### Step 1: Remove Current Gmail Service

1. Go to: https://dashboard.emailjs.com/admin
2. Click **"Email Services"** in left sidebar
3. Find your Gmail service
4. Click the **trash/delete icon** to remove it
5. Confirm deletion

---

### Step 2: Reconnect Gmail with Proper Permissions

1. Stay on **"Email Services"** page
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**

**IMPORTANT**: When Google asks for permissions:
- ✅ **Allow** EmailJS to send emails on your behalf
- ✅ **Allow** all requested permissions
- ✅ Don't skip any permission screens

5. Sign in with: **jayantivishnoi31@gmail.com**
6. You'll see several permission screens - **ACCEPT ALL**
7. After connection, you'll see "Connected successfully"
8. **Copy the new Service ID** (it might be different from before)

---

### Step 3: Update Service ID in Code

If your Service ID changed, update it:

**File**: `src/app/services/email.service.ts` (line 22)

```typescript
serviceId: 'YOUR_NEW_SERVICE_ID_HERE',  // ← Update with new Service ID
```

---

### Step 4: Verify Gmail App Permissions

Sometimes you need to ensure EmailJS has access:

1. Go to: https://myaccount.google.com/permissions
2. Sign in with: jayantivishnoi31@gmail.com
3. Look for **"EmailJS"** in the list
4. Make sure it shows:
   - ✅ "Send emails on your behalf"
   - ✅ Status: Active

If EmailJS is not in the list or shows limited access:
- Remove it
- Go back to EmailJS and reconnect (Step 2)

---

### Step 5: Alternative - Use App Password (If Error Persists)

If reconnecting doesn't work, use Gmail App Password:

#### A. Enable 2-Step Verification (if not enabled)
1. Go to: https://myaccount.google.com/security
2. Click **"2-Step Verification"**
3. Follow steps to enable it

#### B. Create App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with jayantivishnoi31@gmail.com
3. Select **"Mail"** and **"Other (Custom name)"**
4. Enter name: **"EmailJS VichranTrip"**
5. Click **"Generate"**
6. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)

#### C. Use App Password in EmailJS
1. In EmailJS dashboard → Email Services
2. Instead of "Connect Account", choose **"Configure manually"**
3. Enter:
   - **Email**: jayantivishnoi31@gmail.com
   - **Password**: [paste the 16-character app password]
   - **SMTP Server**: smtp.gmail.com
   - **Port**: 465
4. Save and test

---

## 🧪 Test After Fix

1. **Rebuild your app**:
   ```bash
   cd travel-booking
   npm run build
   ```

2. **Start dev server**:
   ```bash
   npm start
   ```

3. **Test email sending**:
   - Go to http://localhost:4200
   - Make a test booking
   - Check for errors in browser console (F12)
   - Check jayantivishnoi31@gmail.com inbox

---

## 🔍 Debugging Checklist

If still not working, check:

### 1. Browser Console (F12 → Console)
Look for:
- ✅ "EmailJS initialized successfully"
- ✅ Service ID and User ID logged
- ❌ Any error messages

### 2. EmailJS Dashboard
1. Go to: https://dashboard.emailjs.com/admin/logs
2. Check **"Email History"**
3. Look for:
   - ✅ Sent emails (green checkmark)
   - ❌ Failed emails (red X)
4. Click failed emails to see error details

### 3. Verify Configuration
In `email.service.ts`:
- [ ] Service ID is correct
- [ ] All Template IDs are correct
- [ ] User ID (Public Key) is correct
- [ ] USE_REAL_EMAILS = true (line 32)

---

## 📧 Common EmailJS Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| 412 Insufficient scopes | Gmail not properly connected | Reconnect Gmail service |
| 403 Forbidden | Wrong credentials | Check Service ID, User ID |
| 404 Template not found | Wrong template ID | Verify template IDs |
| 401 Unauthorized | Wrong public key | Re-copy from Account → API Keys |
| Network error | EmailJS not initialized | Check USE_REAL_EMAILS = true |

---

## 🎯 Quick Recovery Steps

**If nothing works**, start fresh:

1. **Delete all EmailJS services**
2. **Revoke EmailJS from Google permissions**: https://myaccount.google.com/permissions
3. **Clear browser cache** (Ctrl+Shift+Del)
4. **Restart browser**
5. **Start setup from scratch** using `EMAILJS_TESTING_SETUP.md`

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ No errors in browser console
- ✅ Green success message in EmailJS dashboard
- ✅ Email arrives in inbox within 30 seconds
- ✅ Console shows: "✅ EmailJS initialized successfully"

---

## 📞 Still Stuck?

1. **Check EmailJS Status**: https://status.emailjs.com/
2. **EmailJS Support**: support@emailjs.com
3. **EmailJS Docs**: https://www.emailjs.com/docs/

---

## 🔄 After Fixing

Once Gmail is reconnected successfully:

1. Get your **new Service ID** (if changed)
2. Share all your IDs with me:
   ```
   Service ID: _______________
   Public Key: _______________
   Booking Template ID: _______________
   Enquiry Template ID: _______________
   Newsletter Template ID: _______________
   ```
3. I'll update the code immediately
4. Ready to test! 🚀

---

**The 412 error is common and easily fixable by reconnecting Gmail properly! 💪**
