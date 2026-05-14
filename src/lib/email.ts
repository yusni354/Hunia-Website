import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || 'noreply@hunia.id',
      ...options,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;

  await sendEmail({
    to: email,
    subject: 'Verifikasi Email Anda - HUNiA',
    html: `
      <h2>Verifikasi Email Anda</h2>
      <p>Klik link di bawah untuk memverifikasi email Anda:</p>
      <a href="${verificationUrl}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #10b981;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">Verifikasi Email</a>
      <p>Link berlaku selama 24 jam.</p>
    `,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  await sendEmail({
    to: email,
    subject: 'Reset Password - HUNiA',
    html: `
      <h2>Reset Password Anda</h2>
      <p>Klik link di bawah untuk reset password Anda:</p>
      <a href="${resetUrl}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #10b981;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">Reset Password</a>
      <p>Link berlaku selama 1 jam.</p>
    `,
  });
};