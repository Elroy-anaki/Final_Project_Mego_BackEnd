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


export const setObjectByPayPalSchema = (meals) => {
  const mealsBySchema = meals.map((meal) => {
    return {
      name:meal.meal.mealName,
      quantity: String(meal.quantity),
      unit_amount: {
        currency_code: "ILS",
        value: String(meal.meal.mealPrice * meal.quantity)
      }
    }
  })
  console.log(mealsBySchema)

}
export const createOrder = async (meals, totalPrice) => {

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
            { items: setObjectByPayPalSchema(meals),
              amount: {
                currency_code: "ILS",
                value: String(Number(totalPrice).toFixed(2)),
              },
              
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            brand_name: "nethanel love paypal",
          },
        }),
      });
      return data.id;
    } catch (error) {
      console.log(error);
    }
  };

  export const capturePayment = async (orderId) => {
    try {
      const access_token = await generateAccessToken();
  
      const { data } = await axios({
        url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${access_token}`,
        },
      });
  
      return data;
    } catch (error) {
      console.log(error);
    }
  }
