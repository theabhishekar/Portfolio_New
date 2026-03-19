// /pages/api/newsletter/send-update.js
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Create SMTP transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple admin authentication
  const { adminSecret, updateType, title, description } = req.body;
  
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get all active subscribers from Supabase
    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('is_active', true);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch subscribers' });
    }

    if (!subscribers || subscribers.length === 0) {
      return res.status(200).json({ message: 'No subscribers found', sent: 0 });
    }

    // Email template
    const getEmailTemplate = (title, description) => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Portfolio Update from MAGI</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 30px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #1a1a2e; margin: 0; font-size: 28px; font-weight: bold;">
                🚀 Portfolio Update!
              </h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">
                Fresh from MAGI's Portfolio
              </p>
            </div>

            <!-- Content -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 30px;">
              <h2 style="margin: 0 0 15px 0; font-size: 24px;">${title}</h2>
              <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.5; opacity: 0.9;">
                ${description}
              </p>
              <a href="${process.env.PORTFOLIO_URL}" 
                 style="display: inline-block; background: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Check it out →
              </a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">
                You're receiving this because you subscribed to portfolio updates.
              </p>
              <p style="color: #999; font-size: 14px; margin: 0;">
                <a href="${process.env.PORTFOLIO_URL}" style="color: #667eea;">Visit Portfolio</a> | 
                <a href="${process.env.PORTFOLIO_URL}/unsubscribe" style="color: #999;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    };

    // Send emails to all subscribers
    const emailPromises = subscribers.map((subscriber) => {
      return transporter.sendMail({
        from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
        to: subscriber.email,
        subject: `🚀 ${title} - New Portfolio Update!`,
        html: getEmailTemplate(title, description),
        text: `${title}\n\n${description}\n\nCheck it out: ${process.env.PORTFOLIO_URL}`, // Fallback text
      });
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    // Log the update in database (optional)
    await supabase.from('portfolio_updates').insert({
      update_type: updateType || 'manual',
      title,
      description,
      url: process.env.PORTFOLIO_URL,
      email_sent: true
    });

    res.status(200).json({ 
      success: true, 
      message: `Successfully sent ${subscribers.length} emails`,
      sent: subscribers.length 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      error: 'Failed to send emails',
      details: error.message 
    });
  }
}