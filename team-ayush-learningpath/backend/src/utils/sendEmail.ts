// src/utils/sendEmail.ts
import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html: string;
}

/**
 * Sends a real email using Nodemailer and credentials from your .env file.
 * This function connects to an SMTP server to dispatch the email.
 */
export const sendEmail = async (options: EmailOptions) => {
    // 1. Create a "transporter" object using the SMTP transport protocol
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        auth: {
            user: process.env.EMAIL_USER, // Your SMTP username from your email provider
            pass: process.env.EMAIL_PASSWORD, // Your SMTP password
        },
    });

    // 2. Define the email options
    const mailOptions = {
        from: `Masterly <${process.env.EMAIL_FROM}>`, // Sender address (e.g., 'noreply@masterly.com')
        to: options.to,
        subject: options.subject,
        text: options.text, // Plain text body
        html: options.html, // HTML body
    };

    // 3. Send the email and wait for the result
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully. Message ID: ' + info.messageId);
        // Using Mailtrap, the email will now appear in your sandbox inbox.
    } catch (error) {
        console.error('Error sending email:', error);
        // This will prevent the app from crashing but signals that the email failed
        throw new Error('Email could not be sent.');
    }
};
