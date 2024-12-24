import Table from '../models/table.model.js'

export const buildOrderObj = async (order, tableId) => {
    const table = await Table.findById(tableId)
    const fullOrder = order;
    fullOrder.user = { ...table.user };
    table.user = undefined
    fullOrder.table = {
      SharedWith: table.SharedWith,
      meals: table.meals,
      totalPrice: table.totalPrice,
    }; 
    return fullOrder
  }
  