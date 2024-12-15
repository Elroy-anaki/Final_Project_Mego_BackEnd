import Employee from "../models/emlpoyee.model.js";
import { compare } from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";



export const addEmployee = async (req, res) => {
  try {
    console.log(req.body);
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
    console.log("employeePassword:", employeePassword)
    console.log("employeeEmail:", employeeEmail)

    if (!employeePassword || !employeeEmail)
      throw new Error("all fields required!");

    // if Email Exist
    const employeeFromData = await Employee.findOne({ employeeEmail: employeeEmail });
    console.log(employeeFromData);


    if (!employeeFromData) throw new Error("employee Not Exist!");

    // if Password match
    const isMatch = await compare(employeePassword, employeeFromData.employeePassword);

    if (!isMatch) throw new Error("Password not Valid!");

    const data = { ...employeeFromData._doc, employeePassword: "*********" };

    // Send User Token For Experience with ReAuthenticate 
    const token = jwt.sign({ data }, "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF", {
      expiresIn: 60 * 60 * 1
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 1
    });

    res.status(200).json({
      success: true,
      msg: "Success Login User",
      data

    });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      msg: "not Success Login User",
      error: error.msg || error,
    });
  }
};

export const getAllEmployees = async (req, res) => {
  console.log("employees")
  const { limit , page } = req.query;

  
  try {
    const countEmployees = await Employee.countDocuments();
    console.log("countEmployees", countEmployees)

    const employees = await Employee.find().skip((page - 1) * limit).limit(limit);
    console.log(employees)
    res.status(200).json({
       success: true, 
       msg: "success get all employees", 
       data: employees ,
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
      index: 'autoCompleteEmployees',
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
      employeesEmail: 1,
      employeePassword: 1,
      premission: 1
    }
  });
  pipeline.push({
    $limit: 5
  });

  try {
    const employees = await Employee.aggregate(pipeline).sort({ score: - 1 })
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
  console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
  console.log(req.params.id)
  delete req.body.employeePassword
  console.log(req.body)
  try {
    const editEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(204).json({
      success: true,
      msg: "Employee Edited!",
      data: editEmployee
    })
    
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


