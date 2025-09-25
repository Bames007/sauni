// //This is for sending prospective student emails
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendProspectiveStudentEmail = async (
//   email: string,
//   prospectiveId: string,
//   password: string,
//   fullName: string,
//   program: string,
//   applicationLink: string
// ) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Admissions <admissions@sauni.edu>",
//       to: email,
//       subject: "Your SAU Application Submission",
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background-color: #017840; color: white; padding: 20px; text-align: center; }
//             .content { padding: 20px; border: 1px solid #ddd; }
//             .credentials { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
//             .button { display: inline-block; padding: 10px 20px; background-color: #017840; color: white; text-decoration: none; border-radius: 5px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>Southern Atlantic University</h1>
//             </div>
//             <div class="content">
//               <h2>Dear ${fullName},</h2>
//               <p>Thank you for submitting your application to Southern Atlantic University.</p>

//               <p>You have applied for: <strong>${program}</strong></p>

//               <div class="credentials">
//                 <h3>Your Login Credentials:</h3>
//                 <p><strong>Prospective ID:</strong> ${prospectiveId}</p>
//                 <p><strong>Temporary Password:</strong> ${password}</p>
//                 <p>Please keep these credentials safe as you will need them to check your application status.</p>
//               </div>

//               <p>You can check your application status at any time using the link below:</p>
//               <p><a href="${applicationLink}" class="button">Check Application Status</a></p>

//               <p>Our admissions team will review your application and contact you within 2-3 days regarding next steps.</p>

//               <p>If you have any questions, please contact our admissions office at admissions@sauni.edu or call +234 (81) 2772 8084.</p>

//               <p>Best regards,<br/>SAUNI Admissions Team</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `,
//     });

//     if (error) {
//       console.error("Error sending email:", error);
//       throw error;
//     }

//     return data;
//   } catch (error) {
//     console.error("Failed to send email:", error);
//     throw error;
//   }
// };
