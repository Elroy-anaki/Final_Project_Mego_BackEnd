import transporter from "../config/nodemailer.config.js";

 function sendEmailVerification (user) {
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
export default sendEmailVerification;