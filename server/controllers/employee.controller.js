import Employee from "../models/emlpoyee.model.js";
import { compare } from "bcrypt";
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

    const employee = { ...employeeFromData._doc, employeePassword: "*********" };

    // Send User Token For Experience with ReAuthenticate 
    const token = jwt.sign({ employee: employee }, "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF", {
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
      data: employee

    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "not Success Login User",
      error: error.msg || error,
    });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res
      .status(200)
      .json({ success: true, msg: "success get all employees", data: employees });

  }
  catch (error) {
    console.log(error);
    return res.status(404).json({
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

export const employeeIsTokenExist = async (req, res) => {
  try {

    const { token } = req.cookies;

    if (!token) throw new Error("Token not Exist");

    const decode = jwt.verify(token, "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF");

    if (!decode) throw new Error("Token Not Valid")

    res.status(200).json({
      success: true,
      msg: "Success Auth User",
      data: decode.user

    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: error,
      error: error.message || error,
    });
  }

};


