import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = { ...user._doc, userPassword: "*********" };
    const token = jwt.sign({ payload }, "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF", {
        expiresIn: 60 * 60 * 1
    });
    return { token: token, payload: payload }


}
export const jwtCookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 1
}