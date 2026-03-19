import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Create SMTP transporter for welcome emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Welcome email template - Exact Canva HTML with personalization
const getWelcomeEmailTemplate = (email: string) => {
  // Extract name from email (part before @)
  const emailName = email.split('@')[0];
  // Capitalize first letter and handle common separators
  const displayName = emailName
    .replace(/[._-]/g, ' ') // Replace dots, underscores, hyphens with spaces
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
      <link rel="preload" as="image" href="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/d4d0dd553d1731094583a8ca962fac36.png">
      <link rel="preload" as="image" href="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/8cd8a06872af93400acdfbd61bf94048.png">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <meta name="x-apple-disable-message-reformatting">
      <title>Welcome to MAGI's Portfolio Newsletter</title>
      <!--[if mso]><div>
                      <noscript>
                        <xml>
                          <o:OfficeDocumentSettings>
                            <o:AllowPNG/>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                          </o:OfficeDocumentSettings>
                        </xml>
                      </noscript></div><![endif]-->
      <!--[if !mso]><!-->
      <style>
        @media (max-width: 200px) {
          .layout-0 { display: none !important; }
        }
        @media (max-width: 200px) and (min-width: 0px) {
          .layout-0-under-200 { display: table !important; }
        }
        @media (max-width: 450px) {
          .layout-1 { display: none !important; }
        }
        @media (max-width: 450px) and (min-width: 0px) {
          .layout-1-under-450 { display: table !important; }
        }
        @media (max-width: 200px) {
          .layout-2 { display: none !important; }
        }
        @media (max-width: 200px) and (min-width: 0px) {
          .layout-2-under-200 { display: table !important; }
        }
        @media (max-width: 450px) {
          .layout-3 { display: none !important; }
        }
        @media (max-width: 450px) and (min-width: 0px) {
          .layout-3-under-450 { display: table !important; }
        }
      </style>
      <!--<![endif]-->
    </head>
    <body style="width:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%;background-color:#f0f1f5;margin:0;padding:0">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f0f1f5" style="background-color:#f0f1f5">
        <tbody>
          <tr>
            <td style="background-color:#f0f1f5">
              <!--[if mso]><center>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tbody>
                              <tr>
                                <td><![endif]-->
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
                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                  <tr>
                                    <td style="padding:0px 20px">
                                      <!-- Hero Image -->
                                      <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                        <tbody>
                                          <tr>
                                            <td align="center">
                                              <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px">
                                                <tbody>
                                                  <tr>
                                                    <td style="width:100%;padding:0">
                                                      <img src="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/b3274256f49765853e7b518fb14705da.png" width="560" height="420" style="display:block;width:100%;height:auto;max-width:100%" alt="Hey this is MAGI ABHISHKEAR - Thank you for subscribing">
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
                                  
                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                  
                                  <!-- Welcome Message -->
                                  <tr>
                                    <td dir="ltr" style="color:#0e1b10;font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;line-height:1.2;text-align:center;padding:0px 20px">
                                      Welcome to my portfolio newsletter! You'll be the first to know about cool stuff<br>
                                    </td>
                                  </tr>
                                  
                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                  
                                  <!-- Bullet Points -->
                                  <tr>
                                    <td style="padding:0px 20px">
                                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial, Helvetica, sans-serif">
                                        <tbody>
                                          <tr>
                                            <td style="width:24px;vertical-align:top;padding-right:8px;text-align:center;white-space:nowrap">
                                              <span style="font-size:18.6667px;color:#0e1b10;display:inline-block">•</span>
                                            </td>
                                            <td style="font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;color:#0e1b10;vertical-align:top;text-align:left;line-height:1.4">
                                              New projects and creative work
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td style="padding:0px 20px">
                                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial, Helvetica, sans-serif">
                                        <tbody>
                                          <tr>
                                            <td style="width:24px;vertical-align:top;padding-right:8px;text-align:center;white-space:nowrap">
                                              <span style="font-size:18.6667px;color:#0e1b10;display:inline-block">•</span>
                                            </td>
                                            <td style="font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;color:#0e1b10;vertical-align:top;text-align:left;line-height:1.4">
                                              Latest blog posts and insights
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td style="padding:0px 20px">
                                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial, Helvetica, sans-serif">
                                        <tbody>
                                          <tr>
                                            <td style="width:24px;vertical-align:top;padding-right:8px;text-align:center;white-space:nowrap">
                                              <span style="font-size:18.6667px;color:#0e1b10;display:inline-block">•</span>
                                            </td>
                                            <td style="font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;color:#0e1b10;vertical-align:top;text-align:left;line-height:1.4">
                                              Behind-the-scenes development stories
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td style="padding:0px 20px">
                                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial, Helvetica, sans-serif">
                                        <tbody>
                                          <tr>
                                            <td style="width:24px;vertical-align:top;padding-right:8px;text-align:center;white-space:nowrap">
                                              <span style="font-size:18.6667px;color:#0e1b10;display:inline-block">•</span>
                                            </td>
                                            <td style="font-size:18.6667px;font-weight:700;letter-spacing:-0.04em;color:#0e1b10;vertical-align:top;text-align:left;line-height:1.4">
                                              Cool tech experiments and tutorials
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  
                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                  
                                  <!-- Divider -->
                                  <tr>
                                    <td style="padding:0px 20px">
                                      <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                        <tbody>
                                          <tr>
                                            <td align="center">
                                              <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px">
                                                <tbody>
                                                  <tr>
                                                    <td height="1px" style="height:1px;border-radius:999px;line-height:1px;font-size:0;background-color:#bfc3c8">&nbsp;</td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  
                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                  
                                  <!-- Want to know more -->
                                  <tr>
                                    <td style="color:#0e1b10;font-size:29.3333px;font-weight:700;letter-spacing:-0.04em;line-height:1.2;text-align:center;padding:0px 20px;font-family:Arial, Helvetica, sans-serif">
                                      Want to know more!
                                    </td>
                                  </tr>
                                  
                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                  
                                  <!-- Button -->
                                  <tr>
                                    <td style="padding:0px 20px">
                                      <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                        <tbody>
                                          <tr>
                                            <td align="center">
                                              <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:300px">
                                                <tbody>
                                                  <tr>
                                                    <td style="width:100%;padding:20px 0">
                                                      <table cellpadding="0" cellspacing="0" style="width:100%;border-spacing:0;border-collapse:separate">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="middle" height="50" style="height:50px;vertical-align:middle;box-sizing:border-box;background-color:#030200;border-top:3px solid #231f20;border-bottom:3px solid #231f20;border-left:3px solid #231f20;border-right:3px solid #231f20;border-top-left-radius:100px;border-top-right-radius:100px;border-bottom-left-radius:100px;border-bottom-right-radius:100px">
                                                              <a href="https://abhishekardev.vercel.app/about" target="_blank" rel="noopener" style="text-decoration:none;display:block">
                                                                <table cellpadding="0" cellspacing="0" style="width:100%;height:100%;border-spacing:0;border-collapse:collapse">
                                                                  <tbody>
                                                                    <tr>
                                                                      <td style="color:#f6f5f1;font-size:18.6667px;font-weight:bold;font-family:Arial, Helvetica, sans-serif;font-style:normal;text-decoration:none;direction:ltr;text-align:center;line-height:1.4em;letter-spacing:0em;vertical-align:middle;box-sizing:border-box">
                                                                        <span style="color:#f6f5f1;mso-style-textfill-type:solid;mso-style-textfill-fill-color:#f6f5f1">Button →</span>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </a>
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
                                    </td>
                                  </tr>
                                  
                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                  
                                  <!-- Pixel Art Section -->
                                  <tr>
                                    <td style="padding:0px 20px">
                                      <table border="0" cellpadding="0" cellspacing="0" class="layout-1" align="center" style="display:table;border-spacing:0px;border-collapse:separate;width:100%;max-width:451px;table-layout:fixed;margin:0 auto;border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0">
                                        <tbody>
                                          <tr>
                                            <td style="text-align:center">
                                              <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;max-width:451px;table-layout:fixed;margin:0 auto">
                                                <tbody>
                                                  <tr>
                                                    <td width="100.00%" style="width:100.00%;box-sizing:border-box;vertical-align:middle;border-top-left-radius:100px;border-top-right-radius:100px;border-bottom-left-radius:100px;border-bottom-right-radius:100px">
                                                      <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                        <tbody>
                                                          <tr>
                                                            <td style="padding:17px">
                                                              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                                                <tbody>
                                                                  <tr>
                                                                    <td dir="ltr" style="color:#1a1a2e;font-size:20px;white-space:pre-wrap;line-height:1.2;text-align:left">Try the Interactive Pixel Art!<br></td>
                                                                  </tr>
                                                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                                                  <tr>
                                                                    <td dir="ltr" style="color:#666666;font-size:16px;white-space:pre-wrap;line-height:1.5;text-align:left">Don't forget to check out the collaborative pixel art canvas on my portfolio. Paint some pixels and leave your mark for other visitors to see!<br></td>
                                                                  </tr>
                                                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                                                  <tr>
                                                                    <td dir="ltr" style="color:#666666;font-size:14px;font-style:italic;white-space:pre-wrap;line-height:1.2;text-align:left">Pro tip: Your artwork is saved and shared with everyone who visits!<br></td>
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
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  
                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                  
                                  <!-- Social Icons -->
                                  <tr>
                                    <td>
                                      <table border="0" cellpadding="0" cellspacing="0" class="layout-2" align="center" style="display:table;border-spacing:0px;border-collapse:separate;width:100%;max-width:100%;table-layout:fixed;margin:0 auto;background-color:#f5f5f5;border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0">
                                        <tbody>
                                          <tr>
                                            <td style="text-align:center;padding:8px 20px">
                                              <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;max-width:560px;table-layout:fixed;margin:0 auto">
                                                <tbody>
                                                  <tr>
                                                    <td width="24.60%" style="width:24.60%;box-sizing:border-box;vertical-align:middle;border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0">
                                                      <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                        <tbody>
                                                          <tr>
                                                            <td style="padding:5px">
                                                              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                                                <tbody>
                                                                  <tr>
                                                                    <td>
                                                                      <a href="https://www.instagram.com/theabhishekar/" target="_blank" rel="noopener nofollow" style="display:block;text-decoration:none;border:none;outline:none" aria-label="https://www.instagram.com/theabhishekar/">
                                                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                                                          <tbody>
                                                                            <tr>
                                                                              <td align="center">
                                                                                <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:31px">
                                                                                  <tbody>
                                                                                    <tr>
                                                                                      <td style="width:100%;padding:0 0">
                                                                                        <img src="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/d36df4d69bfa5a4ba1aca98f1c3ca393.png" width="31" height="32" style="display:block;width:100%;height:auto;max-width:100%" alt="Instagram">
                                                                                      </td>
                                                                                    </tr>
                                                                                  </tbody>
                                                                                </table>
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </a>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                    <td width="3" style="width:3px;box-sizing:border-box;font-size:0">&nbsp;</td>
                                                    <td width="24.60%" style="width:24.60%;box-sizing:border-box;vertical-align:middle;border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0">
                                                      <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                        <tbody>
                                                          <tr>
                                                            <td style="padding:10px">
                                                              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                                                <tbody>
                                                                  <tr>
                                                                    <td>
                                                                      <a href="https://www.linkedin.com/in/theabhishekar-m/" target="_blank" rel="noopener nofollow" style="display:block;text-decoration:none;border:none;outline:none" aria-label="https://www.linkedin.com/in/theabhishekar-m/">
                                                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                                                          <tbody>
                                                                            <tr>
                                                                              <td align="center">
                                                                                <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:40px">
                                                                                  <tbody>
                                                                                    <tr>
                                                                                      <td style="width:100%;padding:0 0">
                                                                                        <img src="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/b9cda63990b1f34afe6a5db0f2789241.png" width="40" height="35" style="display:block;width:100%;height:auto;max-width:100%" alt="LinkedIn">
                                                                                      </td>
                                                                                    </tr>
                                                                                  </tbody>
                                                                                </table>
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </a>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                    <td width="3" style="width:3px;box-sizing:border-box;font-size:0">&nbsp;</td>
                                                    <td width="24.60%" style="width:24.60%;box-sizing:border-box;vertical-align:middle;border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0">
                                                      <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                        <tbody>
                                                          <tr>
                                                            <td style="padding:10px">
                                                              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                                                <tbody>
                                                                  <tr>
                                                                    <td>
                                                                      <a href="https://github.com/theabhishekar" target="_blank" rel="noopener nofollow" style="display:block;text-decoration:none;border:none;outline:none" aria-label="https://github.com/theabhishekar">
                                                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                                                          <tbody>
                                                                            <tr>
                                                                              <td align="center">
                                                                                <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:38px">
                                                                                  <tbody>
                                                                                    <tr>
                                                                                      <td style="width:100%;padding:0 0">
                                                                                        <img src="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/d4d0dd553d1731094583a8ca962fac36.png" width="38" height="39" style="display:block;width:100%;height:auto;max-width:100%" alt="GitHub">
                                                                                      </td>
                                                                                    </tr>
                                                                                  </tbody>
                                                                                </table>
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </a>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                    <td width="3" style="width:3px;box-sizing:border-box;font-size:0">&nbsp;</td>
                                                    <td width="24.60%" style="width:24.60%;box-sizing:border-box;vertical-align:middle;border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0">
                                                      <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                        <tbody>
                                                          <tr>
                                                            <td style="padding:10px">
                                                              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                                                <tbody>
                                                                  <tr>
                                                                    <td>
                                                                      <a href="mailto:theabhishekar@gmail.com" target="_blank" rel="noopener nofollow" style="display:block;text-decoration:none;border:none;outline:none" aria-label="mailto:theabhishekar@gmail.com">
                                                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                                                          <tbody>
                                                                            <tr>
                                                                              <td align="center">
                                                                                <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:40px">
                                                                                  <tbody>
                                                                                    <tr>
                                                                                      <td style="width:100%;padding:0 0">
                                                                                        <img src="https://geo1omip7n9j-g3qbl2m4omgxowosvix08ginkmcwtq.canva-cdn.email/8cd8a06872af93400acdfbd61bf94048.png" width="40" height="31" style="display:block;width:100%;height:auto;max-width:100%" alt="Email">
                                                                                      </td>
                                                                                    </tr>
                                                                                  </tbody>
                                                                                </table>
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </a>
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
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  
                                  <tr><td height="100%" style="height:100%;font-size:0;line-height:0" aria-hidden="true">&nbsp;</td></tr>
                                  
                                  <!-- Footer -->
                                  <tr>
                                    <td style="vertical-align:top">
                                      <table border="0" cellpadding="0" cellspacing="0" class="layout-3" align="center" style="display:table;border-spacing:0px;border-collapse:separate;width:100%;max-width:100%;table-layout:fixed;margin:0 auto;background-color:#070300">
                                        <tbody>
                                          <tr>
                                            <td style="text-align:center;padding:31.130414418485458px 20px">
                                              <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;max-width:522px;table-layout:fixed;margin:0 auto">
                                                <tbody>
                                                  <tr>
                                                    <td width="100.00%" style="width:100.00%;box-sizing:border-box;vertical-align:top">
                                                      <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:0px;border-collapse:separate;width:100%;table-layout:fixed">
                                                        <tbody>
                                                          <tr>
                                                            <td style="padding:7px">
                                                              <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                                                <tbody>
                                                                  <tr>
                                                                    <td dir="ltr" style="color:#ffffff;font-size:14px;line-height:1.15;text-align:center;margin-bottom:16px">
                                                                      You're subscribed as: <strong style="font-size:16px">${displayName}</strong>
                                                                    </td>
                                                                  </tr>
                                                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                                                  <tr>
                                                                    <td dir="ltr" style="color:#ffffff;font-size:14px;line-height:1.15;text-align:center">
                                                                      <a href="https://abhishekardev.vercel.app/about" target="_blank" rel="noopener nofollow" style="color:inherit;text-decoration:inherit">
                                                                        <span style="text-decoration:underline">Visit Portfolio</span>
                                                                      </a>
                                                                      <span> | </span>
                                                                      <a href="mailto:theabhishekar@gmail.com" target="_blank" rel="noopener nofollow" style="color:inherit;text-decoration:inherit">
                                                                        <span>Contact Me</span>
                                                                      </a>
                                                                    </td>
                                                                  </tr>
                                                                  <tr><td style="font-size:0;height:16px" height="16">&nbsp;</td></tr>
                                                                  <tr>
                                                                    <td dir="ltr" style="color:#ffffff;font-size:12px;white-space:pre-wrap;line-height:1.15;text-align:center">
                                                                      Thanks for joining the journey!<br>- MAGI
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
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--[if mso]></td>
                        </tr>
                      </tbody>
                    </table>
                  </center><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email, is_active')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Database check error:', checkError);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (existing) {
      if (existing.is_active) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to updates! 🎉',
          alreadySubscribed: true
        });
      } else {
        // Re-activate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            is_active: true, 
            subscribed_at: new Date().toISOString() 
          })
          .eq('email', email.toLowerCase().trim());

        if (updateError) {
          console.error('Reactivation error:', updateError);
          return NextResponse.json(
            { error: 'Failed to reactivate subscription' },
            { status: 500 }
          );
        }

        // Send welcome back email
        try {
          // Extract name for personalization
          const emailName = email.toLowerCase().trim().split('@')[0];
          const displayName = emailName
            .replace(/[._-]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

          await transporter.sendMail({
            from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
            to: email.toLowerCase().trim(),
            subject: `Welcome Back, ${displayName}!`,
            html: getWelcomeEmailTemplate(email.toLowerCase().trim()),
            text: `Hello ${displayName}!\n\nWelcome back to MAGI's Portfolio Updates!\n\nYour subscription has been reactivated. You'll be notified about new projects, blog posts, and tech experiments.\n\nExplore my portfolio: ${process.env.PORTFOLIO_URL}\n\nThanks for rejoining the journey!\n- MAGI`,
          });
          console.log('Welcome back email sent successfully');
        } catch (emailError) {
          console.error('Welcome back email error:', emailError);
        }

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated. Check your email! 🎉',
          reactivated: true
        });
      }
    }

    // Create new subscription
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        is_active: true,
        subscribed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Subscription error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Send welcome email directly
    try {
      // Extract name for personalization
      const emailName = email.toLowerCase().trim().split('@')[0];
      const displayName = emailName
        .replace(/[._-]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      await transporter.sendMail({
        from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
        to: email.toLowerCase().trim(),
        subject: `Welcome to MAGI's Portfolio Updates, ${displayName}!`,
        html: getWelcomeEmailTemplate(email.toLowerCase().trim()),
        text: `Hello ${displayName}!\n\nWelcome to MAGI's Portfolio Updates!\n\nThanks for subscribing! You'll be the first to know about:\n- New projects and creative work\n- Latest blog posts and insights\n- Behind-the-scenes development stories\n- Cool tech experiments and tutorials\n\nExplore my portfolio: ${process.env.PORTFOLIO_URL}\n\nDon't forget to try the interactive pixel art canvas!\n\nThanks for joining the journey!\n- MAGI`,
      });
      console.log(`Welcome email sent successfully to: ${email}`);
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for a welcome message. 🎉',
      subscriber: { id: data.id, email: data.email }
    }, { status: 201 });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({
      error: 'Something went wrong. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}