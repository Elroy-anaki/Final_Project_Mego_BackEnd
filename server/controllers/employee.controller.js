import Employee from "../models/emlpoyee.model.js";
import { compare } from "bcrypt";
import { jwtCookieOptions, generateToken } from "../service/auth.service.js";



export const addEmployee = async (req, res) => {
  try {
    const { employeeName, employeeEmail, employeePassword } = req.body;

    if (!employeeName || !employeeEmail || !employeePassword)
      throw new Error("all fields required!");
    const employee = await Employee.create(req.body);
    return res
      .status(201).json({
        success: true,
        msg: "success add employee",
        data: employee
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "not success add employee",
      error,
    });
  }
};

export const signIn = async (req, res) => {
  console.log(req.body)
  try {
    const { employeePassword, employeeEmail } = req.body;

    if (!employeePassword || !employeeEmail)
      throw new Error("all fields required!");

    // if Email Exist
    const employeeFromData = await Employee.findOne({ employeeEmail: employeeEmail });
    console.log(employeeFromData);


    if (!employeeFromData) throw new Error("employee Not Exist!");

    // if Password match
    const isMatch = await compare(employeePassword, employeeFromData.employeePassword);

    if (!isMatch) throw new Error("Password not Valid!");


    // Send User Token For Experience with ReAuthenticate 
    const data = generateToken(employeeFromData);
    const token = data.token;
    const payload = data.payload;

    res.cookie("token", token, jwtCookieOptions);

    res.status(200).json({
      success: true,
      msg: "Success Login User",
      data

    });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      msg: error.message || "not Success Login User",
      error: error,
    });
  }
};

export const getAllEmployees = async (req, res) => {

  const { limit, page, search = 'all' } = req.query;
  const filterBy = search === 'all' ? {} : { premission: search }

  try {
    const countEmployees = await Employee.countDocuments();

    const employees = await Employee.find(filterBy).skip((page - 1) * limit).limit(limit);
    console.log("employees", employees)
    res.status(200).json({
      success: true,
      msg: "success get all employees",
      data: employees,
      count: countEmployees
    });
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

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById();
    return res
      .status(200)
      .json({ success: true, msg: "success get employees by id", data: employee });

  }
  catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      msg: "not success get employee by id",
      error,
    });

  }
};

export const autoComplete = async (req, res) => {
  const { query } = req.query
  console.log(query)

  const pipeline = [];

  pipeline.push({
    $search: {
      index: String(process.env.MONGO_SEARCH_INDEX_EMPLOYEE),
      autocomplete: {
        query: query,
        path: 'employeeName',
        tokenOrder: 'sequential',
      }
    }
  });
  pipeline.push({
    $project: {
      _id: 1,
      score: { $meta: 'searchScore' },
      employeeName: 1,
      employeeEmail: 1,
      employeePassword: 1,
      premission: 1
    }
  });
  pipeline.push({
    $limit: 5
  });

  try {
    const employees = await Employee.aggregate(pipeline).sort({ score: - 1 })
    console.log("employees", employees)
    res.status(200).json({
      success: true,
      msg: "Take Suggestions",
      data: employees
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,
      msg: "Error",
      error: error
    })
  }


};

export const editEmployeeById = async (req, res) => {
  console.log(req.params.id)
  delete req.body.employeePassword
  console.log(req.body)
  try {
    const editEmployee = await Employee.findByIdAndUpdate(req.params.id, { premission: req.body.premission }, { new: true });
    res.status(200).json({
      success: true,
      msg: "Employee Edited!",
      data: editEmployee
    })
    console.log(editEmployee);


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Employee NOT Edited!",
      error: error.message || error
    })


  }

  return
};

export const deleteEmployeeById = async (req, res) => {
  console.log(req.params.id);
  try {
    const employeeToDelete = await Employee.findByIdAndDelete(req.params.id)
    res.status(204).json({
      success: true,
      msg: "Employee deleted successfully!",
      data: employeeToDelete
    })
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      msg: "Employee NOT deleted successfully!",
      error: error
    })

  }
};


