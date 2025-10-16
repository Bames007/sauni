// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const {
//       email,
//       prospectiveId,
//       password,
//       fullName,
//       program,
//       applicationLink,
//       secondChoice,
//     } = body;

//     // Validate required fields
//     if (
//       !email ||
//       !prospectiveId ||
//       !password ||
//       !fullName ||
//       !program ||
//       !applicationLink
//     ) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Send separate emails to university and applicant
//     const emailPromises = [];

//     // Email to University (Admin/Internal) - Simplified format
//     //     const universityEmail = {
//     //       from: "SAU Admissions <onboarding@resend.dev>",
//     //       to: ["southernatlanticuniversity@gmail.com"],
//     //       subject: `New Application Received - ${prospectiveId}`,
//     //       html: `<!DOCTYPE html>
//     // <html lang="en">
//     // <head>
//     //   <meta charset="UTF-8" />
//     //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     //   <title>New Application - SAU</title>
//     //   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
//     //   <style>
//     //     body {
//     //       font-family: 'Poppins', Arial, sans-serif;
//     //       line-height: 1.7;
//     //       color: #333;
//     //       margin: 0;
//     //       padding: 25px;
//     //       background: #f4f4f4;
//     //     }

//     //     .container {
//     //       max-width: 620px;
//     //       margin: 0 auto;
//     //       background: #ffffff;
//     //       border-radius: 10px;
//     //       overflow: hidden;
//     //       box-shadow: 0 4px 15px rgba(0,0,0,0.08);
//     //     }

//     //     /* HEADER */
//     //     .header {
//     //       background: linear-gradient(135deg, #017840, #015c32);
//     //       color: #fff;
//     //       text-align: center;
//     //       padding: 35px 20px 25px;
//     //     }

//     //     .header img {
//     //       width: 90px;
//     //       height: auto;
//     //       margin-bottom: 10px;
//     //     }

//     //     .header h1 {
//     //       font-size: 22px;
//     //       font-weight: bold;
//     //       margin-bottom: 5px;
//     //     }

//     //     .header p {
//     //       font-size: 15px;
//     //       opacity: 0.9;
//     //       margin: 0;
//     //     }

//     //     /* CONTENT */
//     //     .content {
//     //       padding: 30px 25px;
//     //     }

//     //     .content p {
//     //       margin: 10px 0;
//     //     }

//     //     .details-table {
//     //       width: 100%;
//     //       border-collapse: collapse;
//     //       margin: 18px 0;
//     //     }

//     //     .details-table th, .details-table td {
//     //       padding: 10px 12px;
//     //       text-align: left;
//     //       vertical-align: top;
//     //       font-size: 15px;
//     //     }

//     //     .details-table th {
//     //       background: #f1f8f3;
//     //       color: #015c32;
//     //       font-weight: 600;
//     //       width: 40%;
//     //       border-bottom: 2px solid #e0e0e0;
//     //     }

//     //     .details-table td {
//     //       border-bottom: 1px solid #e0e0e0;
//     //     }

//     //     .details-table tr:last-child td,
//     //     .details-table tr:last-child th {
//     //       border-bottom: none;
//     //     }

//     //     /* FOOTER */
//     //     .footer {
//     //       background: linear-gradient(135deg, #017840, #015c32);
//     //       color: #fff;
//     //       text-align: center;
//     //       padding: 25px 15px 30px;
//     //       font-size: 14px;
//     //     }

//     //     .footer img {
//     //       width: 70px;
//     //       height: auto;
//     //       margin-bottom: 8px;
//     //     }

//     //     .footer a {
//     //       color: #fff;
//     //       text-decoration: none;
//     //       font-weight: 500;
//     //     }

//     //     .footer a:hover {
//     //       text-decoration: underline;
//     //     }

//     //     @media (max-width: 600px) {
//     //       .content, .header, .footer {
//     //         padding: 20px;
//     //       }
//     //       .details-table th, .details-table td {
//     //         display: block;
//     //         width: 100%;
//     //       }
//     //       .details-table th {
//     //         border-bottom: none;
//     //         background: none;
//     //         padding-top: 15px;
//     //       }
//     //       .details-table td {
//     //         padding-top: 0;
//     //         padding-bottom: 15px;
//     //       }
//     //     }
//     //   </style>
//     // </head>
//     // <body>
//     //   <div class="container">
//     //     <!-- HEADER -->
//     //     <div class="header">
//     //       <img src="https://sauni.edu.ng/sauni-logo.png" alt="SAU Logo" />
//     //       <h1>Southern Atlantic University</h1>
//     //       <p>New Application Received</p>
//     //     </div>

//     //     <!-- CONTENT -->
//     //     <div class="content">
//     //       <p><strong>Application Summary</strong></p>

//     //       <table class="details-table">
//     //         <tr>
//     //           <th>Prospective ID</th>
//     //           <td><strong>${prospectiveId}</strong></td>
//     //         </tr>
//     //         <tr>
//     //           <th>Applicant Name</th>
//     //           <td>${fullName}</td>
//     //         </tr>
//     //         <tr>
//     //           <th>Email</th>
//     //           <td>${email}</td>
//     //         </tr>
//     //         <tr>
//     //           <th>First Choice Program</th>
//     //           <td>${program}</td>
//     //         </tr>
//     //         <tr>
//     //           <th>Second Choice Program</th>
//     //           <td>${secondChoice || "Not specified"}</td>
//     //         </tr>
//     //         <tr>
//     //           <th>Submission Time</th>
//     //           <td>${new Date().toLocaleString()}</td>
//     //         </tr>
//     //       </table>

//     //       <p><em>This application requires review in the admissions portal.</em></p>
//     //     </div>

//     //     <!-- FOOTER -->
//     //     <div class="footer">
//     //       <img src="https://sauni.edu.ng/sauni-logo.png" alt="SAU Logo" />
//     //       <p>
//     //         <a href="mailto:admissions@sauni.edu.ng">admissions@sauni.edu.ng</a> |
//     //         <a href="tel:+2348127728084">+234 (81) 2772 8084</a>
//     //       </p>
//     //       <p>Airport Road, Uyo, Akwa-Ibom State, Nigeria</p>
//     //       <p style="opacity:0.85; margin-top:8px;">© 2025 Southern Atlantic University. All rights reserved.</p>
//     //     </div>
//     //   </div>
//     // </body>
//     // </html>
//     // `,
//     //     };

//     // Email to Applicant (Current UI Design) - Updated to 2025
//     const applicantEmail = {
//       from: "SAU Admissions <onboarding@resend.dev>",
//       to: [email],
//       subject: `SAU Application Submitted - ${prospectiveId}`,
//       html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>SAU Application Confirmation</title>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
//   <style>
//     body {
//       font-family: 'Poppins', sans-serif;
//       background: #f8f9fa;
//       color: #333;
//       margin: 0;
//       padding: 0;
//     }

//     .container {
//       max-width: 600px;
//       margin: 20px auto;
//       background: #fff;
//       border-radius: 12px;
//       overflow: hidden;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//     }

//     /* HEADER */
//     .header {
//       background: linear-gradient(135deg, #017840, #015c32);
//       color: #fff;
//       text-align: center;
//       padding: 30px 20px;
//     }

//     .header img {
//       width: 80px;
//       height: auto;
//       margin-bottom: 10px;
//     }

//     .header h1 {
//       font-size: 22px;
//       font-weight: 600;
//       margin-bottom: 5px;
//     }

//     .content {
//       padding: 30px 25px;
//     }

//     h2.greeting {
//       color: #017840;
//       font-size: 22px;
//       margin-bottom: 15px;
//     }

//     p {
//       line-height: 1.6;
//       margin-bottom: 15px;
//     }

//     .program-info,
//     .credentials {
//       background: #f9fafb;
//       border: 1px solid #e0e0e0;
//       border-radius: 8px;
//       padding: 20px;
//       margin: 20px 0;
//     }

//     .program-info h3,
//     .credentials h3 {
//       color: #017840;
//       font-size: 18px;
//       margin-bottom: 10px;
//     }

//     .credential-item {
//       margin: 10px 0;
//       display: flex;
//       flex-wrap: wrap;
//       gap: 5px;
//     }

//     .credential-label {
//       font-weight: 600;
//       color: #017840;
//       min-width: 150px;
//     }

//     .credential-value {
//       background: #fff;
//       border: 1px solid #ddd;
//       border-radius: 6px;
//       padding: 6px 10px;
//       font-family: 'Courier New', monospace;
//       font-weight: 600;
//       letter-spacing: 1px;
//     }

//     .button {
//       display: inline-block;
//       background: #017840;
//       color: #fff !important;
//       text-decoration: none;
//       padding: 12px 24px;
//       border-radius: 6px;
//       font-weight: 600;
//       margin: 20px 0;
//       transition: background 0.3s ease;
//     }

//     .button:hover {
//       background: #015c32;
//     }

//     .next-steps h3 {
//       color: #017840;
//       margin-bottom: 10px;
//       font-size: 18px;
//     }

//     .next-steps ul {
//       margin: 0;
//       padding-left: 20px;
//     }

//     .next-steps li {
//       margin-bottom: 8px;
//       color: #555;
//     }

//     .signature {
//       border-top: 1px solid #eee;
//       margin-top: 30px;
//       padding-top: 20px;
//       color: #666;
//     }

//     /* FOOTER */
//     .footer {
//       background: linear-gradient(135deg, #017840, #015c32);
//       color: white;
//       text-align: center;
//       padding: 25px 15px;
//       font-size: 14px;
//     }

//     .footer a {
//       color: #fff;
//       text-decoration: none;
//     }

//     .footer img {
//       width: 70px;
//       height: auto;
//       margin-bottom: 8px;
//     }

//     @media (max-width: 600px) {
//       .content {
//         padding: 20px;
//       }

//       .credential-label {
//         min-width: auto;
//       }
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <!-- HEADER -->
//     <div class="header">
//       <img src="https://sauni.edu.ng/sauni-logo.png" alt="SAU Logo" />
//       <h1>Southern Atlantic University</h1>
//       <p style="opacity:0.9;">Application Confirmation</p>
//     </div>

//     <!-- CONTENT -->
//     <div class="content">
//       <h2 class="greeting">Dear ${fullName},</h2>

//       <p>
//         Thank you for submitting your application to <strong>Southern Atlantic University</strong>. We're excited to review your application and learn more about you.
//       </p>

//       <div class="program-info">
//         <h3>Program Selection</h3>
//         <p><strong>First Choice:</strong> ${program}</p>
//         ${secondChoice && secondChoice !== program ? `<p><strong>Second Choice:</strong> ${secondChoice}</p>` : ""}
//       </div>

//       <div class="credentials">
//         <h3>Your Application Credentials</h3>

//         <div class="credential-item">
//           <span class="credential-label">Prospective ID:</span>
//           <span class="credential-value">${prospectiveId}</span>
//         </div>

//         <div class="credential-item">
//           <span class="credential-label">Temporary Password:</span>
//           <span class="credential-value">${password}</span>
//         </div>

//         <p style="text-align:center; font-size:13px; color:#666;">Please keep these credentials safe. You'll need them to check your application status.</p>
//       </div>

//       <div style="text-align:center;">
//         <a href="${applicationLink}" class="button">Check Your Application Status</a>
//         <p style="font-size:13px; color:#666;">Use the button above to log in and track your application progress anytime.</p>
//       </div>

//       <div class="next-steps">
//         <h3>What Happens Next?</h3>
//         <ul>
//           <li>Our admissions team will review your application.</li>
//           <li>Login to your Application Status to check your Admission Status.</li>
//           <li>You'll receive an update within 7-14 days.</li>
//           <li>We may contact you for additional information.</li>
//           <li>Final admission decision will be communicated via email.</li>
//         </ul>
//       </div>

//       <div class="signature">
//         <p>Best regards,</p>
//         <p><strong>SAU Admissions Committee</strong><br />Southern Atlantic University</p>
//       </div>
//     </div>

//     <!-- FOOTER -->
//     <div class="footer">
//       <img src="https://sauni.edu.ng/sauni-logo.png" alt="SAU Logo" />
//       <p>
//         <a href="mailto:admissions@sauni.edu.ng">admissions@sauni.edu.ng</a> |
//         <a href="tel:+2348127728084">+234 (81) 2772 8084</a>
//       </p>
//       <p>Airport Road, Uyo, Akwa-Ibom State, Nigeria</p>
//       <p style="opacity:0.8; margin-top:8px;">© 2025 Southern Atlantic University. All rights reserved.</p>
//     </div>
//   </div>
// </body>
//               </html>`,
//     };

//     // Send both emails
//     emailPromises.push(resend.emails.send(applicantEmail));

//     // emailPromises.push(resend.emails.send(universityEmail));

//     // Wait for all emails to be sent
//     const results = await Promise.allSettled(emailPromises);

//     // Check for errors
//     const errors = results
//       .filter(
//         (result): result is PromiseRejectedResult =>
//           result.status === "rejected"
//       )
//       .map((result) => result.reason);

//     if (errors.length > 0) {
//       console.error("Some emails failed to send:", errors);
//       return NextResponse.json(
//         {
//           error: `Failed to send some emails: ${errors.map((e: any) => e.message).join(", ")}`,
//         },
//         { status: 500 }
//       );
//     }

//     console.log("✅ All emails sent successfully");
//     console.log(
//       "📧 University email sent to: southernatlanticuniversity@gmail.com"
//     );
//     console.log("📧 Confirmation email sent to:", email);

//     return NextResponse.json({
//       message:
//         "Application submitted successfully! Confirmation emails have been sent.",
//     });
//   } catch (error) {
//     console.error("Email sending error:", error);
//     return NextResponse.json(
//       { error: "Failed to process email request" },
//       { status: 500 }
//     );
//   }
// }
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

    // Send separate emails to university and applicant
    const emailPromises = [];

    // Email to Applicant (Current UI Design) - Updated to 2025
    const applicantEmail = {
      from: "SAU Admissions <onboarding@resend.dev>",
      to: "vicechancellorsau@gmail.com",
      subject: `SAU Application Submitted - ${prospectiveId}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SAU Application Confirmation</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background: #f8f9fa;
      color: #333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    /* HEADER */
    .header {
      background: linear-gradient(135deg, #017840, #015c32);
      color: #fff;
      text-align: center;
      padding: 30px 20px;
    }

    .header img {
      width: 80px;
      height: auto;
      margin-bottom: 10px;
    }

    .header h1 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .content {
      padding: 30px 25px;
    }

    h2.greeting {
      color: #017840;
      font-size: 22px;
      margin-bottom: 15px;
    }

    p {
      line-height: 1.6;
      margin-bottom: 15px;
    }

    .program-info,
    .credentials {
      background: #f9fafb;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }

    .program-info h3,
    .credentials h3 {
      color: #017840;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .credential-item {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .credential-label {
      font-weight: 600;
      color: #017840;
      min-width: 150px;
    }

    .credential-value {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 6px 10px;
      font-family: 'Courier New', monospace;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .button {
      display: inline-block;
      background: #017840;
      color: #fff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
      transition: background 0.3s ease;
    }

    .button:hover {
      background: #015c32;
    }

    .next-steps h3 {
      color: #017840;
      margin-bottom: 10px;
      font-size: 18px;
    }

    .next-steps ul {
      margin: 0;
      padding-left: 20px;
    }

    .next-steps li {
      margin-bottom: 8px;
      color: #555;
    }

    .signature {
      border-top: 1px solid #eee;
      margin-top: 30px;
      padding-top: 20px;
      color: #666;
    }

    /* FOOTER */
    .footer {
      background: linear-gradient(135deg, #017840, #015c32);
      color: white;
      text-align: center;
      padding: 25px 15px;
      font-size: 14px;
    }

    .footer a {
      color: #fff;
      text-decoration: none;
    }

    .footer img {
      width: 70px;
      height: auto;
      margin-bottom: 8px;
    }

    @media (max-width: 600px) {
      .content {
        padding: 20px;
      }

      .credential-label {
        min-width: auto;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <img src="https://sauni.edu.ng/sauni-logo.png" alt="SAU Logo" />
      <h1>Southern Atlantic University</h1>
      <p style="opacity:0.9;">Application Confirmation</p>
    </div>

    <!-- CONTENT -->
    <div class="content">
      <h2 class="greeting">Dear ${fullName},</h2>

      <p>
        Thank you for submitting your application to <strong>Southern Atlantic University</strong>. We're excited to review your application and learn more about you.
      </p>

      <div class="program-info">
        <h3>Program Selection</h3>
        <p><strong>First Choice:</strong> ${program}</p>
        ${secondChoice && secondChoice !== program ? `<p><strong>Second Choice:</strong> ${secondChoice}</p>` : ""}
      </div>

      <div class="credentials">
        <h3>Your Application Credentials</h3>

        <div class="credential-item">
          <span class="credential-label">Prospective ID:</span>
          <span class="credential-value">${prospectiveId}</span>
        </div>

        <div class="credential-item">
          <span class="credential-label">Temporary Password:</span>
          <span class="credential-value">${password}</span>
        </div>

        <p style="text-align:center; font-size:13px; color:#666;">Please keep these credentials safe. You'll need them to check your application status.</p>
      </div>

      <div style="text-align:center;">
        <a href="${applicationLink}" class="button">Check Your Application Status</a>
        <p style="font-size:13px; color:#666;">Use the button above to log in and track your application progress anytime.</p>
      </div>

      <div class="next-steps">
        <h3>What Happens Next?</h3>
        <ul>
          <li>Our admissions team will review your application.</li>
          <li>Login to your Application Status to check your Admission Status.</li>
          <li>You'll receive an update within 7-14 days.</li>
          <li>We may contact you for additional information.</li>
          <li>Final admission decision will be communicated via email.</li>
        </ul>
      </div>

      <div class="signature">
        <p>Best regards,</p>
        <p><strong>SAU Admissions Committee</strong><br />Southern Atlantic University</p>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <img src="https://sauni.edu.ng/sauni-logo.png" alt="SAU Logo" />
      <p>
        <a href="mailto:admissions@sauni.edu.ng">admissions@sauni.edu.ng</a> | 
        <a href="tel:+2348127728084">+234 (81) 2772 8084</a>
      </p>
      <p>Airport Road, Uyo, Akwa-Ibom State, Nigeria</p>
      <p style="opacity:0.8; margin-top:8px;">© 2025 Southern Atlantic University. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
    };

    // Send only applicant email
    emailPromises.push(resend.emails.send(applicantEmail));

    // Wait for all emails to be sent
    const results = await Promise.allSettled(emailPromises);

    // Check for errors
    const errors = results
      .filter(
        (result): result is PromiseRejectedResult =>
          result.status === "rejected"
      )
      .map((result) => result.reason);

    if (errors.length > 0) {
      console.error("Email failed to send:", errors);
      return NextResponse.json(
        {
          error: `Failed to send email: ${errors.map((e: any) => e.message).join(", ")}`,
        },
        { status: 500 }
      );
    }

    console.log("✅ Applicant email sent successfully");
    console.log("📧 Confirmation email sent to:", email);

    return NextResponse.json({
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
