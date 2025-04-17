import nodemailer from "nodemailer";
import crypto from "crypto";

// config for nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "acrossdevice01@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
    },
});


const sendResetEmail = async (email) => {
    const token = crypto.randomBytes(32).toString('hex');
    let resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`
    const mailOptions = {
        from: 'acrssdevice01@gmail.com', // Sender address
        to: email, // Receiver address
        subject: 'Reset Your Password', // Subject line
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .email-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .email-header h2 {
                    color: #333;
                }
                .email-body {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 20px;
                }
                .button-container {
                    text-align: center;
                }
                .reset-button {
                    padding: 15px 30px;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #4CAF50;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    text-decoration: none;
                }
                .reset-button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h2>Password Reset Request</h2>
                </div>
                <div class="email-body">
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the button below to reset your password.</p>
                </div>
                <div class="button-container">
                    <a href="${resetLink}" class="reset-button">Reset Password</a>
                </div>
                <div class="email-footer" style="margin-top: 20px; text-align: center; font-size: 14px; color: #777;">
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return token
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export { sendResetEmail };

