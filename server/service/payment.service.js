import axios from "axios";

async function generateAccessToken() {
  try {
    const { data } = await axios({
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      method: "POST",
      data: "grant_type=client_credentials",
      auth: {
        username: "AQo7NVIVKw_tJ_SYLk3Dk7hjiejm6uaAy91uyPHfP7VyjLB8OalqpFfoWCjWy0ZoQFRGS8rRq8BsB9Os",
        password: "EMdWwcG9jiBZ8ZI-wlxUkkDJoNPeU6Q1d5yLyVvzX2oSNVmKmeS3bUcCpMoaZnWkMWtZiqpao7Tp_JM-",
      },
    });
    console.log(data)
    return data.access_token;
  } catch (error) {
    console.log(error);
  }
}

export const createOrder = async () => {
    try {
      const access_token = await generateAccessToken();
  
      const { data } = await axios({
        url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        data: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "ILS",
                value: "49.00",
              },
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            brand_name: "nethanel love paypal",
            // return_url:"שולח אותכם לכתובת שבחרתם"
            // cancel_url:"במידה וביטלתם שולח אותכם לכתובת שבחרתם"
          },
        }),
      });
      // save data for user still dont payed;
      return data.id;
    } catch (error) {
      console.log(error);
    }
  };
generateAccessToken()