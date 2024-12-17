import { Schema , model } from "mongoose";
import { hash } from "bcrypt";

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique:true
    },
    userPassword:{
        type:String,
        required:true,
        min:5
    },
    premission:{
        type:String,
        default:"user",
    },
    verify: {
        type: Boolean,
        default: false
    }
},{timestamps:true});


userSchema.pre("save",async function(next){
 this.userPassword = await hash(this.userPassword,10);
 next();
})
const User = model("Users",userSchema);

export default User;