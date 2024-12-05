import Employee from "../models/emlpoyee.model.js";


export const addEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const { employeeName, employeeEmail , employeePassword } = req.body;

    if (!employeeName || !employeeEmail || !employeePassword)
        throw new Error("all fields required!"); 
    const employee = await Employee.create(req.body);
    return res
      .status(201).json({ 
        success: true,
        msg: "success add employee",
        data: employee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "not success add employee",
      error,
    });
  }
}
export const getAllEmployees = async (req , res)=>{
    try{
    const employees = await Employee.find();
    return res
    .status(200)
    .json({ success: true, msg: "success get all employees", data: employees });

    }
    catch(error){
        console.log(error);
        return res.status(404).json({
          success: false,
          msg: "not success get all employees",
          error,
        });

    }
}
export const getEmployeeById = async (req , res)=>{
    try{
    const employee = await Employee.findById();
    return res
    .status(200)
    .json({ success: true, msg: "success get employees by id", data: employee });

    }
    catch(error){
        console.log(error);
        return res.status(404).json({
          success: false,
          msg: "not success get employee by id",
          error,
        });

    }
}
export const employeeIsTokenExist = async (req, res) => {
  console.log(req.cookies);
   if (req.cookies.token)
     res.status(200).json({
       success: true,
       msg: 'Token exist!'
     });
   console.log("Token NOT exist!")
   res.status(401).json({
     success: false,
     msg: "Token NOT exist!"
   })
 }


