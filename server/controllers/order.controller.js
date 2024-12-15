import Order from "../models/order.model.js";


export const addOrder = async (req, res) => {
  try {
    console.log(req.body);
   
    const order = await Order.create(req.body);
    res
      .status(201).json({
        success: true,
        msg: "success add order",
        data: order
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "not success add order",
      error,
    });
  }
};

export const getAllOrders = async (req, res) => {
  console.log("orders")
  
  try {
    const orders = await Order.find();
    console.log(orders)
    res
      .status(200)
      .json({ success: true, msg: "success get all orders", data: orders });
  }
  catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      msg: "not success get all employees",
      error,
    });

  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res
      .status(200)
      .json({ success: true, msg: "success get order by id", data: order });

  }
  catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      msg: "not success get order by id",
      error,
    });

  }
};

export const editOrderById = async (req, res) => {
  console.log("edit-------Order------By-------Id")
  console.log(req.params.id)
  console.log(req.body)
  try {
    const editedOrder = await Order.findByIdAndUpdate(req.params.id,
        { status: req.body.status },
        { new: true });
    
    res.status(204).json({
      success: true,
      msg: "Order Edited!",
      data: editedOrder
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Order NOT Edited!",
      error: error.message || error
    })
    
    
  }
  
  return
}

export const deleteEmployeeById = async (req, res) => {
  console.log(req.params.id);
  try {
    const orderToDelete = await Employee.findByIdAndDelete(req.params.id)
    res.status(204).json({
      success: true,
      msg: "Order deleted successfully!",
      data: orderToDelete
    })
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      msg: "Order NOT deleted successfully!",
      error: error
    })
    
  }
}


