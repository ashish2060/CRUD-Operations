import nodemailer from "nodemailer";
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, tableData) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: tableData,
  };

  await transporter.sendMail(mailOptions);
}
