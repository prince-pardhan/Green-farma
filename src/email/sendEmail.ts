import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "srk016361@gmail.com",
    pass: "swus djcx hxnv sysc", // Gmail App Password
  },
});

export const SendEmailOTP = async (email: string, otp: string) => {

  const info = await transporter.sendMail({
    from: "srk016361@gmail.com",
    to: email,
    subject: "Green-Farma - OTP Verification",
    text: `Your OTP is ${otp}`,
    html: `
  <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin-top:30px; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

    <tr>
      <td style="background:#2e7d32; padding:20px; text-align:center; color:#ffffff;">
        <h1 style="margin:0;"> Green-Farma</h1>
      </td>
    </tr>

    <tr>
      <td style="padding:30px;">
        <h2 style="color:#2e7d32;">Welcome to Green Farma!</h2>
        
        <p style="font-size:16px; color:#333;">
          Dear <b>Sir</b>,
        </p>

        <p style="font-size:15px; color:#555; line-height:1.6;">
          Thank you for signing up with <b>Green Farma</b>.
        </p>

        <p style="font-size:16px; color:#000;">
          Your OTP is:
        </p>

        <h1 style="color:#2e7d32; letter-spacing:3px;">
          ${otp}
        </h1>

        <p style="font-size:14px; color:#777;">
          This OTP is valid for 5 minutes.
        </p>

        <p style="font-size:14px; color:#777;">
          If you did not create this account, please ignore this email.
        </p>

        <p style="font-size:14px; color:#777;">
          Thanks & Regards,<br>
          Green Farma Team
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#f1f1f1; padding:15px; text-align:center; font-size:12px; color:#777;">
        © 2026 Welcome to Green Farma.
      </td>
    </tr>

  </table>
`,
  });
   
  console.log("Message sent:", info.messageId);
};