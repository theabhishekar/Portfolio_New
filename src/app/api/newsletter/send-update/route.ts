import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { adminSecret, updateType, title, description } = await request.json();
    
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Get all active subscribers from Supabase
    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('is_active', true);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscribers found',
        sent: 0
      });
    }

    // Email template - Based on Canva design
    const getEmailTemplate = (title: string, description: string) => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Portfolio Update from MAGI</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f0f2f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #f0f2f5; padding: 40px 20px;">
            
            <!-- Hero Section with Gradient -->
            <div style="background: linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #06b6d4 100%); border-radius: 24px; padding: 60px 40px; text-align: center; margin-bottom: 40px; position: relative; overflow: hidden;">
              <!-- Decorative elements -->
              <div style="position: absolute; top: 20px; right: 30px; width: 60px; height: 60px; background: rgba(255, 165, 0, 0.3); border-radius: 50%; filter: blur(20px);"></div>
              <div style="position: absolute; bottom: 30px; left: 40px; width: 40px; height: 40px; background: rgba(255, 69, 0, 0.4); border-radius: 50%; filter: blur(15px);"></div>
              
              <h1 style="color: white; font-size: 28px; font-weight: 400; margin-bottom: 8px; letter-spacing: -0.5px;">
                Hey this is
              </h1>
              <h2 style="color: white; font-size: 52px; font-weight: 700; margin-bottom: 12px; letter-spacing: -1px;">
                MAGI<br>
                <span style="font-size: 28px; font-weight: 400; letter-spacing: 2px;">ABHISHKEAR</span>
              </h2>
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 18px; margin: 0;">
                Portfolio Update
              </p>
            </div>

            <!-- Main Update Content -->
            <div style="background: white; border-radius: 16px; padding: 40px; margin-bottom: 30px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <h3 style="color: #1f2937; font-size: 24px; font-weight: 600; margin-bottom: 20px;">
                ${title}
              </h3>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                ${description}
              </p>

              <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                I'd love for you to check it out and see what I've been working on. Your feedback means the world to me!
              </p>
            </div>

            <!-- Call to Action -->
            <div style="background: white; border-radius: 16px; padding: 40px; margin-bottom: 30px; text-align: center; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <h3 style="color: #1f2937; font-size: 24px; font-weight: 600; margin-bottom: 30px;">
                Want to know more!
              </h3>
              <a href="${process.env.PORTFOLIO_URL}" style="display: inline-block; background: #000000; color: white; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 16px;">
                Visit Portfolio →
              </a>
            </div>

            <!-- Interactive Pixel Art Section -->
            <div style="background: white; border-radius: 16px; padding: 40px; margin-bottom: 30px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <h3 style="color: #1f2937; font-size: 22px; font-weight: 600; margin-bottom: 20px;">
                Try the Interactive Pixel Art!
              </h3>
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                Don't forget to check out the collaborative pixel art canvas on my portfolio. 
                Leave your mark and see what other visitors have created!
              </p>
            </div>

            <!-- Social Links -->
            <div style="text-align: center; margin-bottom: 30px;">
              <table style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 15px;">
                    <a href="https://instagram.com/theabhishekar" style="text-decoration: none;">
                      <div style="width: 48px; height: 48px; background: #1f2937; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 20px;">📷</span>
                      </div>
                    </a>
                  </td>
                  <td style="padding: 0 15px;">
                    <a href="https://linkedin.com/in/theabhishekar" style="text-decoration: none;">
                      <div style="width: 48px; height: 48px; background: #1f2937; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 20px;">💼</span>
                      </div>
                    </a>
                  </td>
                  <td style="padding: 0 15px;">
                    <a href="https://github.com/theabhishekar" style="text-decoration: none;">
                      <div style="width: 48px; height: 48px; background: #1f2937; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 20px;">💻</span>
                      </div>
                    </a>
                  </td>
                  <td style="padding: 0 15px;">
                    <a href="mailto:${process.env.FROM_EMAIL}" style="text-decoration: none;">
                      <div style="width: 48px; height: 48px; background: #1f2937; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 20px;">📧</span>
                      </div>
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Footer -->
            <div style="background: #1f2937; border-radius: 16px; padding: 30px; text-align: center;">
              <p style="color: #d1d5db; font-size: 14px; margin-bottom: 15px;">
                You're receiving this update as a portfolio subscriber
              </p>
              <div style="border-top: 1px solid #374151; padding-top: 20px;">
                <a href="${process.env.PORTFOLIO_URL}" style="color: #60a5fa; text-decoration: none; font-size: 14px; margin-right: 20px;">
                  Visit Portfolio
                </a>
                <span style="color: #6b7280;">|</span>
                <a href="mailto:${process.env.FROM_EMAIL}?subject=Portfolio Update Feedback" style="color: #60a5fa; text-decoration: none; font-size: 14px; margin-left: 20px;">
                  Send Feedback
                </a>
              </div>
              <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
                Thanks for being part of my journey!<br>
                - MAGI
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
        subject: `${title} - New Portfolio Update!`,
        html: getEmailTemplate(title, description),
        text: `${title}\n\n${description}\n\nCheck it out: ${process.env.PORTFOLIO_URL}`,
      });
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    // Log the update in database
    await supabase.from('portfolio_updates').insert({
      update_type: updateType || 'manual',
      title,
      description,
      url: process.env.PORTFOLIO_URL,
      email_sent: true,
      email_sent_at: new Date().toISOString(),
      subscribers_count: subscribers.length
    });

    return NextResponse.json({
      success: true,
      message: `Successfully sent ${subscribers.length} emails! 📧`,
      sent: subscribers.length
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({
      error: 'Failed to send emails',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}