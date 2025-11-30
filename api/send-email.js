import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, company, role, email, message, services } = req.body;

    // Validate required fields
    if (!name || !company || !email || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'company', 'email', 'message']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Create professional HTML email template
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .info-section { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea; }
          .info-item { margin: 8px 0; }
          .label { font-weight: bold; color: #555; }
          .value { margin-left: 10px; }
          .message-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border: 1px solid #ddd; }
          .footer { text-align: center; padding: 15px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>🚀 New Contact Form Submission</h2>
          <p>Someone wants to collaborate with you!</p>
        </div>
        
        <div class="content">
          <div class="info-section">
            <h3>👤 Contact Information</h3>
            <div class="info-item">
              <span class="label">Name:</span>
              <span class="value">${name}</span>
            </div>
            <div class="info-item">
              <span class="label">Company:</span>
              <span class="value">${company}</span>
            </div>
            <div class="info-item">
              <span class="label">Role:</span>
              <span class="value">${role || 'Not specified'}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${email}">${email}</a></span>
            </div>
          </div>

          <div class="info-section">
            <h3>🛠️ Services Requested</h3>
            <p>${services && services.length > 0 ? services.join(', ') : 'Not specified'}</p>
          </div>

          <div class="message-box">
            <h3>💬 Project Details</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>

        <div class="footer">
          <p>This email was sent from your portfolio contact form at <strong>rifqirenaldo.my.id</strong></p>
          <p>You can reply directly to this email to contact ${name}</p>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <noreply@rifqirenaldo.my.id>', // Use your verified domain
      to: ['renaldorifqi@gmail.com'],
      replyTo: email, // User can reply directly to the sender
      subject: `🚀 New Contact: ${name} from ${company}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ 
        message: 'Failed to send email', 
        error: error.message || 'Unknown error'
      });
    }

    console.log('Email sent successfully:', data);
    res.status(200).json({ 
      message: 'Email sent successfully!', 
      id: data.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}