//we verify jwt token(token valid or not)
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//in middleware we have to pass the next so that after middleware inside router goes to authController.user
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
 
    if(!token) {
        return res
          .status(401)
          .json({msg: "Unauthorized HTTP, Token not provided"});
    }
    
    //Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
    const jwtToken = token.replace("Bearer", "").trim(); //for removing bearer because we need only token
    //trim will remove the space just after and before the Bearer
    console.log("token form auth middleware", token);

    try {
        //verifying the token(user is valid)
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        //getting the complete user details & also we don't want password to be sent
        const userData = await User.findOne({email:isVerified.email}).select({
            password: 0,
        });
        console.log(userData);

        //we created own property
        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        //move on to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized, Invalid token."});
    }
};

module.exports = authMiddleware;