import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        httpOnly: true, // prevent client-side JS from reading the cookie - XSS - cross site scripting attack
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict", // CSRF - cross site request forgery attack
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export default generateTokenAndSetCookie;
