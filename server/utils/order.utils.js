import OrderTable from '../models/orderTable.model.js'

export const changeStatusByOrderType =  async(orderId, type, newStatus) => {
  try {
    if(type === 'orderTable') {
      const order = await OrderTable.findByIdAndUpdate(orderId, {status:newStatus}, {new:true})
      return order
    } 
 
  } catch (error) {
    throw error
  }

};
  