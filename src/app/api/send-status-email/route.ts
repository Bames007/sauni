import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("📧 API Route: /api/send-status-email hit");

  try {
    const body = await request.json();
    console.log("Received data:", body);

    const { email, prospectiveId, fullName, program, status, applicationLink } =
      body;

    if (!email || !prospectiveId || !fullName || !program || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log(`Sending ${status} email to:`, email);

    const recipientEmails = [
      "southernatlanticuniversity@gmail.com",
      email,
    ].filter(Boolean);

    const subject =
      status === "accepted"
        ? `Congratulations! Your Application to SAU has been Accepted - ${prospectiveId}`
        : `Update on Your SAU Application - ${prospectiveId}`;

    const htmlContent = generateStatusEmail(
      fullName,
      prospectiveId,
      program,
      status,
      applicationLink
    );

    const { data, error } = await resend.emails.send({
      from: "SAU Admissions <onboarding@resend.dev>",
      to: recipientEmails,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      if (error.message?.includes("domain is not verified")) {
        return NextResponse.json(
          {
            error: "Domain verification required. Currently in testing mode.",
            details: error.message,
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Status email processed successfully.");
    return NextResponse.json({
      data,
      message: "Status email has been sent successfully.",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to process status email request" },
      { status: 500 }
    );
  }
}

function generateStatusEmail(
  fullName: string,
  prospectiveId: string,
  program: string,
  status: string,
  applicationLink: string
) {
  const isAccepted = status === "accepted";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SAU Application ${isAccepted ? "Accepted" : "Update"}</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Your email styles here (same as your existing template) */
    body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 15px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #017840 0%, #015c32 100%); padding: 30px 20px; text-align: center; color: white; }
    .content { padding: 40px 35px; }
    .greeting { font-size: 26px; color: #017840; margin-bottom: 20px; font-weight: 600; }
    .button { display: inline-block; background: linear-gradient(135deg, #017840 0%, #015c32 100%); color: white; padding: 15px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <div class="logo-subtitle">Southern Atlantic University</div>
      </div>
    </div>
    
    <div class="content">
      <h2 class="greeting">Dear ${fullName},</h2>
      
      ${
        isAccepted
          ? `
      <p>We are thrilled to inform you that your application to <strong>Southern Atlantic University</strong> has been <strong>accepted</strong>!</p>
      
      <div class="program-info">
        <h3>🎉 Congratulations!</h3>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Prospective ID:</strong> ${prospectiveId}</p>
      </div>
      
      <p>Welcome to the SAU family! We're excited to have you join our academic community.</p>
      `
          : `
      <p>Thank you for your application to <strong>Southern Atlantic University</strong>. After careful consideration, we regret to inform you that we are unable to offer you admission at this time.</p>
      
      <div class="program-info">
        <h3>Application Review Complete</h3>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Prospective ID:</strong> ${prospectiveId}</p>
      </div>
      
      <p>We appreciate your interest in SAU and encourage you to consider reapplying in the future.</p>
      `
      }
      
      <div class="status-link" style="text-align: center; margin: 25px 0;">
        <a href="${applicationLink}" class="button">View Application Status</a>
      </div>
      
      <div class="signature">
        <p>Best regards,</p>
        <p><strong>SAU Admissions Committee</strong><br>Southern Atlantic University</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}
