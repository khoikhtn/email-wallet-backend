import nodemailer from 'nodemailer';

interface SendEmailParams {
  email: string;
  appPassword: string;
  recipientEmail: string;
  subject: string;
}

export const sendEmail = async ({ email, appPassword, recipientEmail, subject }: SendEmailParams) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: appPassword,
    },
  });

  return transporter.sendMail({
    from: email,
    to: recipientEmail,
    subject,
  });
};
