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
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Verify this is coming from Vercel Cron or authorized source
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all active subscribers
    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('is_active', true);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No subscribers found',
        sent: 0 
      });
    }

    // Calculate current week and format date
    const now = new Date();
    const weekNumber = Math.ceil(((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7);
    const formattedDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric' 
    });

    // Weekly email template - Using Canva design
    const getWeeklyEmailTemplate = (email: string) => {
      const emailName = email.split('@')[0];
      const displayName = emailName
        .replace(/[._-]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preload" as="image" href="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/b3274256f49765853e7b518fb14705da.png">
          <link rel="preload" as="image" href="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/d36df4d69bfa5a4ba1aca98f1c3ca393.png">
          <link rel="preload" as="image" href="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/b9cda63990b1f34afe6a5db0f2789241.png">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
          <meta name="x-apple-disable-message-reformatting">
          <title>Weekly Update from MAGI's Portfolio</title>
          <style>
            body { width:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%;background-color:#f0f1f5;margin:0;padding:0 }
            table { border-collapse:collapse;font-family:Arial, Helvetica, sans-serif }
          </style>
        </head>
        <body style="width:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%;background-color:#f0f1f5;margin:0;padding:0">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f0f1f5" style="background-color:#f0f1f5">
            <tbody>
              <tr>
                <td style="background-color:#f0f1f5">
                  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;min-height:600px;margin:0 auto;background-color:#ffffff">
                    <tbody>
                      <tr><td style="vertical-align:top"></td></tr>
                      <tr>
                        <td style="vertical-align:top;padding:10px 0px 0px 0px">
                          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td style="padding:10px 0 10px 0;vertical-align:top">
                                  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                    <tbody>
                                      <tr><td style="padding:0px 20px">
                                        
                                        <!-- Hero Image -->
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                          <tbody><tr><td align="center">
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px">
                                              <tbody><tr>
                                                <td style="width:100%;padding:0">
                                                  <img src="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/b3274256f49765853e7b518fb14705da.png" width="560" height="420" style="display:block;width:100%;height:auto;max-width:100%" alt="Weekly Update from MAGI ABHISHKEAR">
                                                </td>
                                              </tr></tbody>
                                            </table>
                                          </td></tr></tbody>
                                        </table>
                                        
                                      </td></tr>
                                      
                                      <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                      
                                      <!-- Welcome Message -->
                                      <tr><td dir="ltr" style="color:#0e1b10;font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;line-height:1.2;text-align:center;padding:0px 20px">
                                        Weekly update from my portfolio! Here's what's happening this week, ${displayName}!<br>
                                      </td></tr>
                                      
                                      <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                      
                                      <!-- Bullet Points -->
                                      <tr><td dir="ltr" style="line-height:1.2;padding:0px 20px;font-size:0">
                                        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial, Helvetica, sans-serif">
                                          <tbody><tr>
                                            <td style="width:24px;vertical-align:top;padding-right:8px;text-align:right;white-space:nowrap">
                                              <span style="font-size:18.6667px;color:#0e1b10;display:inline-block">•</span>
                                            </td>
                                            <td style="font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;color:#0e1b10;vertical-align:top">
                                              Latest portfolio updates and features<br>
                                            </td>
                                          </tr></tbody>
                                        </table>
                                      </td></tr>
                                      
                                      <tr><td dir="ltr" style="line-height:1.2;padding:0px 20px;font-size:0">
                                        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial, Helvetica, sans-serif">
                                          <tbody><tr>
                                            <td style="width:24px;vertical-align:top;padding-right:8px;text-align:right;white-space:nowrap">
                                              <span style="font-size:18.6667px;color:#0e1b10;display:inline-block">•</span>
                                            </td>
                                            <td style="font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;color:#0e1b10;vertical-align:top">
                                              Fresh blog posts and tech insights<br>
                                            </td>
                                          </tr></tbody>
                                        </table>
                                      </td></tr>
                                      
                                      <tr><td dir="ltr" style="line-height:1.2;padding:0px 20px;font-size:0">
                                        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial, Helvetica, sans-serif">
                                          <tbody><tr>
                                            <td style="width:24px;vertical-align:top;padding-right:8px;text-align:right;white-space:nowrap">
                                              <span style="font-size:18.6667px;color:#0e1b10;display:inline-block">•</span>
                                            </td>
                                            <td style="font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;color:#0e1b10;vertical-align:top">
                                              Behind-the-scenes development stories<br>
                                            </td>
                                          </tr></tbody>
                                        </table>
                                      </td></tr>
                                      
                                      <tr><td dir="ltr" style="line-height:1.2;padding:0px 20px;font-size:0">
                                        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial, Helvetica, sans-serif">
                                          <tbody><tr>
                                            <td style="width:24px;vertical-align:top;padding-right:8px;text-align:right;white-space:nowrap">
                                              <span style="font-size:18.6667px;color:#0e1b10;display:inline-block">•</span>
                                            </td>
                                            <td style="font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;color:#0e1b10;vertical-align:top">
                                              Cool experiments and tutorials<br>
                                            </td>
                                          </tr></tbody>
                                        </table>
                                      </td></tr>
                                      
                                      <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                      
                                      <!-- Separator -->
                                      <tr><td style="padding:0px 20px">
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                          <tbody><tr><td align="center">
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px">
                                              <tbody><tr>
                                                <td height="1px" style="height:1px;border-radius:999px;line-height:1px;font-size:0;background-color:#bfc3c8">&nbsp;</td>
                                              </tr></tbody>
                                            </table>
                                          </td></tr></tbody>
                                        </table>
                                      </td></tr>
                                      
                                      <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                      
                                      <!-- CTA Section -->
                                      <tr><td dir="ltr" style="color:#0e1b10;font-size:29.3333px;font-weight:700;letter-spacing:-0.04em;line-height:1;text-align:center;padding:0px 20px">
                                        Check out what's new!<br>
                                      </td></tr>
                                      
                                      <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                      
                                      <!-- Button -->
                                      <tr><td style="padding:0px 20px">
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                          <tbody><tr><td align="center">
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:300px">
                                              <tbody><tr>
                                                <td style="width:100%;padding:20 0">
                                                  <table cellpadding="0" cellspacing="0" style="width:100%;border-spacing:0;border-collapse:separate">
                                                    <tbody><tr>
                                                      <td valign="middle" height="50" style="height:50px;vertical-align:middle;box-sizing:border-box;background-color:#030200;border-top:3px solid #231f20;border-bottom:3px solid #231f20;border-left:3px solid #231f20;border-right:3px solid #231f20;border-top-left-radius:100px;border-top-right-radius:100px;border-bottom-left-radius:100px;border-bottom-right-radius:100px">
                                                        <a href="https://abhishekardev.vercel.app/about" target="_blank" rel="noopener" style="text-decoration:none;display:block">
                                                          <table cellpadding="0" cellspacing="0" style="width:100%;height:100%;border-spacing:0;border-collapse:collapse">
                                                            <tbody><tr>
                                                              <td style="color:#f6f5f1;font-size:18.6667px;font-weight:bold;font-family:Arial, Helvetica, sans-serif;font-style:normal;text-decoration:none;direction:ltr;text-align:center;line-height:1.4em;letter-spacing:0em;vertical-align:middle;box-sizing:border-box">
                                                                <span style="color:#f6f5f1">Visit Portfolio ➔</span>
                                                              </td>
                                                            </tr></tbody>
                                                          </table>
                                                        </a>
                                                      </td>
                                                    </tr></tbody>
                                                  </table>
                                                </td>
                                              </tr></tbody>
                                            </table>
                                          </td></tr></tbody>
                                        </table>
                                      </td></tr>
                                      
                                      <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                      
                                      <!-- Weekly Highlights Box -->
                                      <tr><td style="padding:0px 20px">
                                        <table border="0" cellpadding="0" cellspacing="0" align="center" style="display:table;border-spacing:0px;border-collapse:separate;width:100%;max-width:451px;table-layout:fixed;margin:0 auto">
                                          <tbody><tr><td style="text-align:center">
                                            <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;max-width:451px;table-layout:fixed;margin:0 auto">
                                              <tbody><tr>
                                                <td width="100.00%" style="width:100.00%;box-sizing:border-box;vertical-align:middle">
                                                  <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                    <tbody><tr><td style="padding:17px">
                                                      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                                        <tbody>
                                                          <tr><td dir="ltr" style="color:#1a1a2e;font-size:20px;line-height:1.2;text-align:left">
                                                            This Week's Highlights - ${formattedDate}<br>
                                                          </td></tr>
                                                          <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                                          <tr><td dir="ltr" style="color:#666666;font-size:16px;line-height:1.5;text-align:left">
                                                            Hope you're having a fantastic week! Enhanced the newsletter system, worked on pixel art improvements, and exploring new React optimization techniques.<br>
                                                          </td></tr>
                                                          <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                                          <tr><td dir="ltr" style="color:#666666;font-size:14px;font-style:italic;line-height:1.2;text-align:left">
                                                            Week ${weekNumber} of 2026 - Keep building amazing things!<br>
                                                          </td></tr>
                                                        </tbody>
                                                      </table>
                                                    </td></tr></tbody>
                                                  </table>
                                                </td>
                                              </tr></tbody>
                                            </table>
                                          </td></tr></tbody>
                                        </table>
                                      </td></tr>
                                      
                                      <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                      
                                      <!-- Footer Section -->
                                      <tr><td>
                                        <table border="0" cellpadding="0" cellspacing="0" align="center" style="display:table;border-spacing:0px;border-collapse:separate;width:100%;max-width:100%;table-layout:fixed;margin:0 auto;background-color:#f5f5f5">
                                          <tbody><tr><td style="text-align:center;padding:8px 20px">
                                            <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;max-width:560px;table-layout:fixed;margin:0 auto">
                                              <tbody><tr>
                                                <!-- Social Icons -->
                                                <td width="24.60%" style="width:24.60%;box-sizing:border-box;vertical-align:middle">
                                                  <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                    <tbody><tr><td style="padding:5px">
                                                      <a href="https://www.instagram.com/theabhishekar/" target="_blank" rel="noopener nofollow" style="display:block;text-decoration:none;border:none;outline:none">
                                                        <img src="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/d36df4d69bfa5a4ba1aca98f1c3ca393.png" width="31" height="32" alt="Instagram" style="display:block;width:100%;height:auto;max-width:31px;margin:0 auto">
                                                      </a>
                                                    </td></tr></tbody>
                                                  </table>
                                                </td>
                                                <td width="3" style="width:3px;box-sizing:border-box;font-size:0">&nbsp;</td>
                                                <td width="24.60%" style="width:24.60%;box-sizing:border-box;vertical-align:middle">
                                                  <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                    <tbody><tr><td style="padding:10px">
                                                      <a href="https://www.linkedin.com/in/theabhishekar-m/" target="_blank" rel="noopener nofollow" style="display:block;text-decoration:none;border:none;outline:none">
                                                        <img src="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/b9cda63990b1f34afe6a5db0f2789241.png" width="40" height="35" alt="LinkedIn" style="display:block;width:100%;height:auto;max-width:40px;margin:0 auto">
                                                      </a>
                                                    </td></tr></tbody>
                                                  </table>
                                                </td>
                                              </tr></tbody>
                                            </table>
                                          </td></tr></tbody>
                                        </table>
                                      </td></tr>
                                      
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
        </html>
      `;
    };

    // Send emails to all subscribers
    const emailPromises = subscribers.map((subscriber) => {
      return transporter.sendMail({
        from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
        to: subscriber.email,
        subject: `Weekly Update from MAGI's Portfolio - Week ${weekNumber}`,
        html: getWeeklyEmailTemplate(subscriber.email),
      });
    });

    await Promise.all(emailPromises);
    
    return NextResponse.json({
      success: true,
      message: `Weekly newsletter sent successfully to ${subscribers.length} subscribers!`,
      sent: subscribers.length,
      week: weekNumber,
      date: formattedDate
    });

  } catch (error) {
    console.error('Weekly newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to send weekly newsletter' },
      { status: 500 }
    );
  }
}