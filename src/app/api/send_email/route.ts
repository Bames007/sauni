import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      email,
      prospectiveId,
      password,
      fullName,
      program,
      applicationLink,
      secondChoice,
    } = body;

    // Validate required fields
    if (
      !email ||
      !prospectiveId ||
      !password ||
      !fullName ||
      !program ||
      !applicationLink
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const recipientEmails = [
      "southernatlanticuniversity@gmail.com",
      email,
    ].filter(Boolean);

    const { data, error } = await resend.emails.send({
      from: "SAU Admissions <onboarding@resend.dev>",

      // from: "SAU Admissions <southernatlanticuniversity@gmail.com>",
      to: recipientEmails,
      subject: `SAU Application Submitted - ${prospectiveId}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SAU Application Confirmation</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Poppins', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
      padding: 20px 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      width: 100% !important;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }
    
    /* Header with logo */
    .header {
      background: linear-gradient(135deg, #017840 0%, #015c32 100%);
      padding: 30px 20px;
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
      transform: rotate(30deg);
    }
    
    
    .logo-subtitle {
      font-size: 26px;
      opacity: 0.9;
      font-weight: 400;
      letter-spacing: 1px;
    }
    
    /* Content area */
    .content {
      padding: 40px 35px;
    }
    
    .greeting {
      font-size: 26px;
      color: #017840;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    /* Program info section */
    .program-info {
      background: #f8f9fa;
      padding: 22px;
      border-radius: 10px;
      margin: 25px 0;
      border-left: 5px solid #BD9946;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    
    .program-info h3 {
      color: #BD9946;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    /* Credentials section */
    .credentials {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 25px;
      border-radius: 10px;
      margin: 30px 0;
      border: 1px solid #e0e0e0;
      box-shadow: 0 3px 8px rgba(0,0,0,0.05);
    }
    
    .credentials h3 {
      color: #017840;
      margin-bottom: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    
    .credential-item {
      margin: 18px 0;
      display: flex;
      align-items: center;
    }
    
    .credential-label {
      font-weight: 600;
      color: #017840;
      min-width: 180px;
      font-size: 15px;
    }
    
    .credential-value {
      font-family: 'Courier New', monospace;
      background: white;
      padding: 10px 15px;
      border-radius: 6px;
      border: 1px solid #ddd;
      flex: 1;
      font-weight: 600;
      letter-spacing: 1px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      word-break: break-all;
    }
    
    /* Button */
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #017840 0%, #015c32 100%);
      color: white;
      padding: 15px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
      box-shadow: 0 4px 8px rgba(1, 120, 64, 0.2);
      font-size: 16px;
      text-align: center;
    }
    
    /* Next steps section */
    .next-steps {
      margin: 30px 0;
    }
    
    .next-steps h3 {
      color: #017840;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .next-steps ul {
      padding-left: 20px;
      color: #555;
    }
    
    .next-steps li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 10px;
    }
    
    .next-steps li::before {
      content: "•";
      color: #BD9946;
      font-weight: bold;
      position: absolute;
      left: -5px;
    }
    
    /* Status link section */
    .status-link {
      text-align: center;
      margin: 25px 0;
    }
    
    .status-link p {
      font-size: 15px;
      color: #666;
      margin-top: 10px;
    }
    
    /* Signature */
    .signature {
      margin-top: 30px;
      border-top: 1px solid #eee;
      padding-top: 20px;
      color: #666;
    }
    
    /* Footer */
    .footer {
      background: #2c3e50;
      color: white;
      padding: 35px 20px;
      text-align: center;
      position: relative;
    }
    
    .footer::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #017840, #BD9946);
    }
    
    .contact-info {
      margin: 20px 0;
      font-size: 15px;
      opacity: 0.9;
      line-height: 1.8;
    }
    
    /* Icons */
    .icon {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 10px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
    }
    
    /* Mobile responsiveness */
    @media screen and (max-width: 600px) {
      .container {
        border-radius: 0;
        box-shadow: none;
      }
      
      .content {
        padding: 25px 20px;
      }
      
      .header {
        padding: 25px 15px;
      }
      
      .logo-text {
        font-size: 36px;
      }
      
      .logo-image {
        max-width: 150px;
      }
      
      .credential-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .credential-label {
        min-width: auto;
      }
      
      .credential-value {
        width: 100%;
      }
      
      .program-info h3, 
      .credentials h3, 
      .next-steps h3 {
        flex-direction: column;
        text-align: center;
        gap: 5px;
      }
      
      .button {
        display: block;
        padding: 12px 24px;
      }
    }
    
    @media screen and (max-width: 480px) {
      .content {
        padding: 20px 15px;
      }
      
      .greeting {
        font-size: 22px;
      }
      
      .program-info, .credentials {
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header with logo -->
    <div class="header">
      <div class="logo-container">
        <!-- Replace with your actual logo URL -->
        
        <div class="logo-subtitle">Southern Atlantic University</div>
      </div>
    </div>
    
    <!-- Content -->
    <div class="content">
      <h2 class="greeting">Dear ${fullName},</h2>
      
      <p>Thank you for submitting your application to <strong>Southern Atlantic University</strong>. We're excited to review your application and learn more about you.</p>
      
      <!-- Program Information -->
      <div class="program-info">
        <h3>
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5"/>
          </svg>
          Program Selection
        </h3>
        <p><strong>First Choice:</strong> ${program}</p>
        ${secondChoice && secondChoice !== program ? `<p><strong>Second Choice:</strong> ${secondChoice}</p>` : ""}
      </div>
      
      <!-- Credentials -->
      <div class="credentials">
        <h3>
          <svg class="icon" viewBox="0 0 24 24">
            <circle cx="8" cy="9" r="4"/>
            <path d="M10 12l5.7 5.7a1 1 0 0 0 1.4 0l2.6-2.6a1 1 0 0 0 0-1.4L16 10"/>
          </svg>
          Your Application Credentials
        </h3>
        
        <div class="credential-item">
          <span class="credential-label">Prospective ID:</span>
          <span class="credential-value">${prospectiveId}</span>
        </div>
        
        <div class="credential-item">
          <span class="credential-label">Temporary Password:</span>
          <span class="credential-value">${password}</span>
        </div>
        
        <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #666;">
          Please keep these credentials safe. You'll need them to check your application status.
        </p>
      </div>
      
      <!-- Application Status Link -->
      <div class="status-link">
        <a href="${applicationLink}" class="button">
          <svg class="icon" viewBox="0 0 24 24" style="stroke: white;">
            <rect x="8" y="4" width="8" height="5" rx="1"/>
            <path d="M16 14v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/>
            <path d="M18 12h-6M14 16h-4"/>
          </svg>
          Check Your Application Status
        </a>
        <p>Use the button above to login and track your application progress anytime.</p>
      </div>
      
      <!-- Next Steps -->
      <div class="next-steps">
        <h3>
          <svg class="icon" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          What Happens Next?
        </h3>
        <ul>
          <li>Our admissions team will review your application</li>
          <li>Login to your Application Status to check your Admission Status</li>
          <li>You'll receive an update within 7-14 days</li>
          <li>We may contact you for additional information</li>
          <li>Final admission decision will be communicated via email</li>
        </ul>
      </div>
      
      <!-- Signature -->
      <div class="signature">
        <p>Best regards,</p>
        <p><strong>SAU Admissions Committee</strong><br>Southern Atlantic University</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="contact-info">
        <p>
          <svg class="icon" viewBox="0 0 24 24">
            <path d="m4 7 6.5 4.5a4 4 0 0 0 3 0L20 7"/>
            <rect x="3" y="5" width="18" height="14" rx="2"/>
          </svg>
          admissions@sauni.edu | 
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M22 16.9v3.1a2 2 0 0 1-2.18 2 20 20 0 0 1-8.63-3.07 20 20 0 0 1-6-6 20 20 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.9z"/>
          </svg>
          +234 (81) 2772 8084
        </p>
        <p>
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            <path d="M19 12a7 7 0 1 0-14 0c0 1.5.5 3 1.5 4.5L12 22l5.5-5.5C18.5 15 19 13.5 19 12Z"/>
          </svg>
          Airport Road Uyo, Akwa-Ibom State, Nigeria
        </p>
      </div>
      <p style="font-size: 13px; opacity: 0.7; margin-top: 20px;">© 2024 Southern Atlantic University. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Email sent successfully to:", recipientEmails);
    return NextResponse.json({
      data,
      message:
        "Application submitted successfully! Confirmation email has been sent.",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to process email request" },
      { status: 500 }
    );
  }
}
