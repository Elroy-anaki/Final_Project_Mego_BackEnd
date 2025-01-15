import transporter from "../config/nodemailer.config.js";
import OrderTable from "../models/orderTable.model.js";

export function sendEmailVerification (user) {
  transporter.sendMail({
    from: String(process.env.EMAIL_SENDER) || "",
    to: user.userEmail,
        subject: "Verfiy Your Email",
        html: `<h1>Hello ${user.userName}</h1>
        <p>Please click the button below to verify your email:</p>
        <a href="http://localhost:8001/auth/email-verification/${user._id}">
        Verify Email
        </a>`,
      })
    
};

export function sendEmailForGotPassword (user,premission) {
   transporter.sendMail({
    from: String(process.env.EMAIL_SENDER) || "",
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
};

export function sendInviteToTableEmail(guests) {
  guests.forEach((guest) => {
    transporter.sendMail({
      from: String(process.env.EMAIL_SENDER) || "",
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
};

export function sendEmailForReviewMeals(orderId, guests) {
  guests.forEach((guest) => {
    transporter.sendMail({
      from: String(process.env.EMAIL_SENDER) || "",
      to: guest.guestEmail,
      subject: "We Value Your Feedback!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background-color: #004080; padding: 20px; color: white; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Thank You for Dining with Us!</h1>
          </div>
          <div style="padding: 20px; background-color: #fff; border: 1px solid #ccc; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px;">Hello Friend,</p>
            <p style="font-size: 16px;">We hope you enjoyed your recent dining experience with us! Your feedback is incredibly important to help us improve and provide the best service possible.</p>
            <p style="font-size: 16px;">Please take a moment to share your thoughts by clicking the button below:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="http://localhost:8001/add-reviews-by-order-id/${orderId}/${guest.guestEmail}" style="
                background-color: #ffa500;
                color: white;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
              ">Leave a Review</a>
            </div>
            <p style="font-size: 14px; color: #666;">Thank you for helping us grow and improve. We look forward to serving you again soon!</p>
          </div>
          <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
            <p>© 2024 [Your Restaurant Name]. All rights reserved.</p>
          </div>
        </div>
      `,
    });
  });
};

export async function sendOrderDetailsToCustomer(newOrder) {
  const populatedOrder = await OrderTable.findById(newOrder._id).populate({
    path: 'table.meals.meal',
    select: 'mealName mealImage'
  });


  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="background-color: #004080; padding: 20px; color: white; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">Your Order Confirmation</h1>
        <p style="margin: 10px 0;">Reservation for ${populatedOrder.dateTime.date} at ${populatedOrder.dateTime.time}</p>
        <p style="margin: 5px 0;">Number of Guests: ${populatedOrder.numberOfGuests}</p>
        <p style="margin: 5px 0;">Total Price ${populatedOrder.table.totalPrice}</p>

      </div>

      <div style="padding: 20px; background-color: #fff; border: 1px solid #ccc; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #004080; margin-bottom: 20px;">Order Details:</h2>
        
        ${populatedOrder.table.meals.map(item => `
          <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <img 
              src="${item.meal.mealImage}" 
              alt="${item.meal.mealName}" 
              style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; margin-right: 15px;"
            >
            <div>
              <h3 style="margin: 0 0 5px 0; color: #004080; font-size: 18px;">${item.meal.mealName}</h3>
              <p style="margin: 0; color: #666;">Quantity: ${item.quantity}</p>
            </div>
          </div>
        `).join('')}

        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 16px; color: #666;">Thank you for choosing our restaurant!</p>
          <p style="font-size: 14px; color: #888;">
            If you have any questions, please contact us at 
            <a href="mailto:support@restaurant.com" style="color: #004080; text-decoration: none;">support@restaurant.com</a>
          </p>
        </div>
      </div>

      <div style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
        <p>© ${new Date().getFullYear()} Your Restaurant Name. All rights reserved.</p>
      </div>
    </div>
  `;

  populatedOrder.table.sharedWith.forEach((guest) => {
    transporter.sendMail({
      from: String(process.env.EMAIL_SENDER) || "",
      to: guest.guestEmail,
      subject: "Your Table Order Confirmation",
      html: emailTemplate,
    });
  });
};
