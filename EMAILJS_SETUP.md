# Email Setup Guide - Resend API Integration

## Overview
Aplikasi ini menggunakan **Resend API** untuk mengirim email profesional langsung dari contact form. Resend adalah layanan email modern yang didesain khusus untuk developer dengan deliverability tinggi dan setup yang mudah.

## ✨ Keunggulan Resend vs EmailJS

### 🚀 **Resend Advantages:**
- **Better Deliverability**: 99.9% email masuk inbox (tidak spam)
- **Professional HTML Emails**: Template HTML yang beautiful
- **Developer-Friendly API**: RESTful API yang clean
- **Built-in Analytics**: Track email delivery, opens, clicks
- **Custom Domain Support**: gunakan domain sendiri
- **Scalable**: dari startup hingga enterprise
- **Better Error Handling**: error messages yang jelas

### 📊 **Pricing Comparison:**
- **Resend Free**: 3,000 emails/month + 100 emails/day
- **EmailJS Free**: 200 emails/month saja

## Setup Resend API

### 1. Buat Akun Resend
1. Kunjungi https://resend.com/
2. Sign up dengan GitHub/Google (gratis)
3. Verifikasi email Anda
4. Masuk ke dashboard

### 2. Dapatkan API Key
1. Di dashboard, klik **"API Keys"**
2. Klik **"Create API Key"**
3. Berikan nama: `Portfolio Contact Form`
4. Permission: **Full access** (atau Domain sending jika sudah setup domain)
5. **Copy API Key** (simpan dengan aman!)

### 3. Setup Environment Variables
Edit file `.env` dan masukkan API key Anda:

```env
RESEND_API_KEY=re_YourActualAPIKey_Here
```

### 4. Optional: Setup Custom Domain
Untuk sender email yang lebih profesional:

1. Di dashboard Resend, pilih **"Domains"**
2. Klik **"Add Domain"** 
3. Masukkan domain Anda (misal: `rifqirenaldo.my.id`)
4. Tambahkan DNS records yang diberikan ke domain registrar Anda
5. Verifikasi domain (biasanya 5-10 menit)
6. Update API endpoint untuk menggunakan custom domain

### 5. Deploy ke Vercel
Karena menggunakan Vercel serverless functions:

```bash
# Deploy to Vercel
npm run build
vercel --prod

# Or push to GitHub (jika sudah connect dengan Vercel)
git add .
git commit -m "Add Resend email integration"
git push origin main
```

### 6. Environment Variables di Vercel
1. Masuk ke Vercel dashboard
2. Pilih project Anda
3. Settings → Environment Variables
4. Tambahkan: `RESEND_API_KEY` = `your_api_key_here`
5. Redeploy project

## Features yang Diimplementasikan

### ✅ **Core Features:**
- **Serverless API**: Menggunakan Vercel Edge Functions
- **Beautiful HTML Emails**: Professional template dengan CSS inline
- **Smart Status Indicators**: Loading, success, error states
- **CORS Support**: Proper headers untuk cross-origin requests
- **Input Validation**: Server-side validation untuk semua field
- **Error Handling**: Fallback ke email client jika API gagal
- **Reply-To Setup**: User bisa reply langsung ke sender

### 📧 **Email Features:**
- **Professional Template**: HTML email dengan gradient header
- **Contact Information**: Nama, company, role, email tersusun rapi
- **Services Section**: Checkbox services yang dipilih
- **Message Formatting**: Pre-formatted text dengan line breaks
- **Footer Information**: Source website dan reply instructions

### 🎯 **User Experience:**
- **Modal Interface**: Form muncul di center screen
- **Smart Loading**: Spinning animation saat mengirim
- **Success Feedback**: Green checkmark + auto-close modal
- **Error Recovery**: Red error state + fallback options
- **Form Reset**: Otomatis reset setelah berhasil kirim

## Email Template Preview

Email yang dikirim akan terlihat seperti ini:

```html
🚀 New Contact Form Submission

Someone wants to collaborate with you!

👤 Contact Information
Name: John Doe  
Company: Acme Inc.
Role: Product Designer
Email: john@example.com

🛠️ Services Requested
Backend Development, API Development

💬 Project Details
Hi Rifqi, I'm interested in working together on a new 
e-commerce project. We need a robust backend API...

---
This email was sent from your portfolio contact form at rifqirenaldo.my.id
You can reply directly to this email to contact John Doe
```

## Testing

### Local Development:
```bash
npm run dev
# Test form di http://localhost:5173
```

### Production Testing:
1. Deploy ke Vercel
2. Test contact form di production URL
3. Check email inbox untuk konfirmasi
4. Monitor Resend dashboard untuk analytics

## Troubleshooting

### Common Issues:

**1. API Key Error (401)**
- Pastikan `RESEND_API_KEY` benar di `.env`
- Pastikan environment variable ter-deploy di Vercel

**2. CORS Errors**
- API endpoint sudah include CORS headers
- Pastikan request dari domain yang sama

**3. Email Not Delivered**
- Check Resend dashboard → Logs
- Verify recipient email valid
- Check spam folder

**4. Vercel Function Error**
- Check Vercel function logs di dashboard
- Pastikan API endpoint deployed: `/api/send-email`

### Debug Commands:
```bash
# Check environment variables
echo $RESEND_API_KEY

# Test API endpoint locally (if using vercel dev)
vercel dev

# Check Vercel logs
vercel logs
```

## Security & Best Practices

### ✅ **Security Measures:**
- **API Key Server-Side**: API key hanya di server, tidak exposed ke frontend
- **Input Sanitization**: Semua input di-sanitize untuk prevent XSS
- **Rate Limiting**: Resend built-in rate limiting
- **CORS Headers**: Proper CORS configuration
- **Environment Variables**: Sensitive data di environment variables

### 🚀 **Performance:**
- **Edge Functions**: Vercel edge functions untuk latency rendah
- **Async/Await**: Non-blocking email sending
- **Error Recovery**: Smart fallback mechanisms
- **Optimized Bundle**: Import hanya yang diperlukan

## Monitoring & Analytics

### Resend Dashboard:
- **Email Delivery Status**: Sent, delivered, bounced, complained
- **Open Rates**: Track email opens (optional)
- **Error Logs**: Detail error messages
- **Usage Analytics**: Monthly/daily usage stats

### Custom Analytics (Optional):
- Track form submissions di Google Analytics
- Monitor success/error rates
- A/B test email templates

## Scaling Considerations

### Free Tier Limits:
- 3,000 emails/month
- 100 emails/day
- Perfect untuk portfolio/small business

### When to Upgrade:
- $20/month untuk 50,000 emails
- Custom domain included
- Priority support
- Advanced analytics

## Alternative Configurations

Jika tidak menggunakan Vercel, bisa deploy ke:
- **Netlify Functions** (adjust API structure)
- **Railway** (Node.js server)
- **Firebase Functions** (Google Cloud)
- **AWS Lambda** (serverless)