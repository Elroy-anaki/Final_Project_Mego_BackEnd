import transporter from "../config/nodemailer.config.js";

export function sendEmailVerification (user) {
    transporter.sendMail({
        from:"",
        to: user.userEmail,
        subject: "Verfiy Your Email",
        html: `<h1>Hello ${user.userName}</h1>
        <p>Please click the button below to verify your email:</p>
        <a href="http://localhost:8001/auth/email-verification/${user._id}">
          Verify Email
        </a>`,
    })
}

export function sendEmailForGotPassword (user,premission) {
   transporter.sendMail({
    from: process.env.EMAIL_FROM || "your-email@example.com",
    to: premission === "user" ? user.userEmail : user.employeeEmail,
    subject: "Reset Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Reset Your Password</h1>
        <p>Hello ${ premission === "user" ? user.userName : user.employeeName},</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
        ${ premission === "user" ? `<a href="http://localhost:8001/auth/reset-password?userId=${user._id}&forgotPasswordId=${user.forgotPasswordId}"
             style="background-color: #FF6B00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>` :`<a href="http://localhost:8000/reset-password?userId=${user._id}&forgotPasswordId=${user.forgotPasswordId}"
             style="background-color: #0A2647; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>`}  
          
        </div>
        <p style="color: #666; font-size: 14px;">
          If you didn't request this password reset, you can safely ignore this email.
        </p>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 24 hours.
        </p>
      </div>
    `,
  });
}

export function sendInviteToTableEmail(guests) {
  guests.forEach((guest) => {
    transporter.sendMail({
      from: "",
      to: guest.guestEmail,
      subject: "Table Invitation",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background-color: #004080; padding: 20px; color: white; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">You're Invited!</h1>
          </div>
          <div style="padding: 20px; background-color: #fff; border: 1px solid #ccc; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px;">Hello,</p>
            <p style="font-size: 16px;">You have been invited to join a table. Click the button below to view the invitation:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="http://localhost:8001/home" style="
                background-color: #ffa500;
                color: white;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
              ">View Invitation</a>
            </div>
            <p style="font-size: 14px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
            <p>© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      `,
    });
  });
}
