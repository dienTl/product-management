const nodemailer = require("nodemailer");

module.exports.sendMail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,        
      pass: process.env.EMAIL_PASSWORD,    
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Website Shop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: html,
    });
    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.error("Send mail error:", err);
  }
};