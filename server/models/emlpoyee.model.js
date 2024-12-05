import { Schema , model } from "mongoose";
import { hash } from "bcrypt";

const emlpoyeeSchema = new Schema({
    employeeName:{
        type:String,
        required:true
    },
    employeeEmail:{
        type:String,
        required:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique:true
    },
    employeePassword:{
        type:String,
        required:true,
        min:5
    },
    premission:{
        type:String,
        default:"admin",
        enum:["employee","admin"]
    }
},{timestamps:true});


emlpoyeeSchema.pre("save",async function(next){
 this.employeePassword = await hash(this.employeePassword,10);
 next();
})
const Employee = model("Employee",emlpoyeeSchema);

export default Employee;