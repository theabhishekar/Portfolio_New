import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

// Create SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Welcome email template
    const getWelcomeEmailTemplate = (email: string) => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Welcome to MAGI's Portfolio Updates!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 30px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #1a1a2e; margin: 0; font-size: 28px; font-weight: bold;">
                🎉 Welcome to the Journey!
              </h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">
                Thanks for subscribing to MAGI's Portfolio Updates
              </p>
            </div>

            <!-- Content -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 30px;">
              <h2 style="margin: 0 0 15px 0; font-size: 24px;">🚀 You're All Set!</h2>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; opacity: 0.9;">
                Welcome to my portfolio newsletter! You'll be the first to know about:
              </p>
              <ul style="margin: 0 0 25px 0; padding-left: 20px; font-size: 16px; line-height: 1.6; opacity: 0.9;">
                <li>🎨 New projects and creative work</li>
                <li>📝 Latest blog posts and insights</li>
                <li>💡 Behind-the-scenes development stories</li>
                <li>🔧 Cool tech experiments and tutorials</li>
              </ul>
              <a href="${process.env.PORTFOLIO_URL}" 
                 style="display: inline-block; background: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Explore My Portfolio →
              </a>
            </div>

            <!-- Interactive Features -->
            <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 15px 0; color: #1a1a2e; font-size: 20px;">🎨 Try the Interactive Pixel Art!</h3>
              <p style="margin: 0 0 15px 0; color: #666; font-size: 16px; line-height: 1.5;">
                Don't forget to check out the collaborative pixel art canvas on my portfolio. Paint some pixels and leave your mark for other visitors to see!
              </p>
              <p style="margin: 0; color: #666; font-size: 14px; font-style: italic;">
                Pro tip: Your artwork is saved and shared with everyone who visits! 🎨
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">
                You're subscribed as: <strong>${email}</strong>
              </p>
              <p style="color: #999; font-size: 14px; margin: 0;">
                <a href="${process.env.PORTFOLIO_URL}" style="color: #667eea;">Visit Portfolio</a> | 
                <a href="mailto:${process.env.FROM_EMAIL}" style="color: #667eea;">Contact Me</a>
              </p>
              <p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">
                Thanks for joining the journey! 🚀<br>
                - MAGI
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    };

    // Send welcome email
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: '🎉 Welcome to MAGI\'s Portfolio Updates!',
      html: getWelcomeEmailTemplate(email),
      text: `Welcome to MAGI's Portfolio Updates!\n\nThanks for subscribing! You'll be notified about new projects, blog posts, and tech experiments.\n\nExplore my portfolio: ${process.env.PORTFOLIO_URL}\n\nDon't forget to try the interactive pixel art canvas!\n\n- MAGI`,
    });

    return NextResponse.json({
      success: true,
      message: 'Welcome email sent successfully! 📧'
    });

  } catch (error) {
    console.error('Welcome email error:', error);
    return NextResponse.json({
      error: 'Failed to send welcome email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}