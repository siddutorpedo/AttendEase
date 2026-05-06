import nodemailer from "nodemailer";

/**
 * Utility to send emails using nodemailer.
 * Supports SMTP (like Gmail, Mailtrap, etc.)
 */
const sendEmail = async (options) => {
  // 1. Create a transporter
  // Configuration is pulled from environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
    port: process.env.EMAIL_PORT || 2525,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Extract OTP from message if possible for better HTML formatting
  // Expected message: "Your password reset OTP is: 123456. It is valid for 10 minutes."
  const otpMatch = options.message.match(/: (\d{6})/);
  const otp = otpMatch ? otpMatch[1] : null;

  // 2. Define the email options
  const mailOptions = {
    from: `AttendEase <${process.env.EMAIL_FROM || "noreply@attendease.com"}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background-color: #f9fafb; color: #1f2937;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #2563eb; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em;">AttendEase</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 16px;">Reset Your Password</h2>
            <p style="font-size: 16px; line-height: 24px; color: #4b5563; margin-bottom: 24px;">
              We received a request to reset your password. Use the verification code below to proceed:
            </p>
            <div style="text-align: center; background-color: #f3f4f6; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <span style="font-size: 36px; font-weight: 700; letter-spacing: 0.25em; color: #1e40af;">
                ${otp || "------"}
              </span>
            </div>
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 32px; text-align: center;">
              This code will expire in <strong>10 minutes</strong>.
            </p>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
              <p style="font-size: 14px; color: #9ca3af; margin: 0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          </div>
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
              &copy; 2026 AttendEase. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `,
  };

  // 3. Actually send the email
  try {
    // If we're in development and credentials are empty, skip sending and just log
    if (process.env.NODE_ENV !== "production" && (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)) {
      console.log("\n--- [SIMULATED EMAIL DELIVERY (CREDENTIALS MISSING)] ---");
      console.log("To:", mailOptions.to);
      console.log("Subject:", mailOptions.subject);
      console.log("OTP Code:", otp);
      console.log("NOTE: Configure .env with EMAIL_USER and EMAIL_PASS to send real emails.");
      console.log("--------------------------------------------------------\n");
      return;
    }

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to: ${options.email}`);
  } catch (err) {
    console.error("❌ Email Delivery Failed:", err.message);

    // In development mode, we provide a fallback so you can still test the flow
    if (process.env.NODE_ENV !== "production") {
      console.log("\n--- [SIMULATED EMAIL DELIVERY (SMTP ERROR)] ---");
      console.log("To:", mailOptions.to);
      console.log("Subject:", mailOptions.subject);
      console.log("OTP Code:", otp);
      console.log("Error Detail:", err.message);
      console.log("----------------------------------------------\n");
      
      // We return gracefully so the frontend proceeds to the OTP entry step
      return;
    }

    throw err;
  }
};

export default sendEmail;
