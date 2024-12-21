import User from '../models/user.model.js'
import Employee from '../models/emlpoyee.model.js'


export const changePasswordByPremission = async (data, queryParams) => {
    try {
        const { premission, password } = data;

        if (premission === 'employee') {
            const employee = await Employee.findById(queryParams.userId);

            if (!employee.forgotPasswordId || (employee.forgotPasswordId !== queryParams.forgotPasswordId)) { throw new Error("This employee doesn't need to reset password ") }

            employee.employeePassword = password;
            employee.forgotPasswordId = undefined;
            employee.save();
            return employee;
        }
        else if (premission === 'user') {
            const user = await User.findOne({_id:queryParams.userId});
            user.userPassword = password;
            user.forgotPasswordId = undefined;
            user.save();
            return user
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
};


export const verifyEmailByType = async (data) => {
    try {
        if (data.type === 'user') {
            const user = await User.findByIdAndUpdate(data.userId, { verify: true })
        }
    } catch (error) {
        console.log("Function", error)
        throw error
    }
};