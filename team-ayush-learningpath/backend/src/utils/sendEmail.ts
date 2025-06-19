// src/utils/sendEmail.ts

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html: string;
}

/**
 * A mock function for sending emails. In a real application, this would
 * integrate with an email service like SendGrid, Mailgun, or Nodemailer.
 * For now, it just logs the email content to the console for debugging.
 */
export const sendEmail = async (options: EmailOptions) => {
    console.log('--- SIMULATING EMAIL ---');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Body (HTML): ${options.html}`);
    console.log('--- END OF SIMULATION ---');
    // In a real app, the email sending logic would be here.
    // For example: await transporter.sendMail(...)
    return Promise.resolve();
};
