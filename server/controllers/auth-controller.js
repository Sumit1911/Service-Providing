const User = require("../models/user.model")
const bcrypt = require("bcrypt");
//home logics
const home = async (req, res) => {
    try {
        res.status(200).send("Lets start building mern App"); 
    } catch (error) {
        console.log(error);
    }
}
//register logic
const register = async (req, res) => {
    try {
        // console.log(req.body);

        const {username, email, phone, password} = req.body; //destructuring object
        
        const userExist = await User.findOne({email});

        if(userExist) {
            return res.status(400).json({message: "email already exists"});
        }

        //hash the password
        // const saltRound = 10; //it is used for hashing the password we can take any number, will take time accordingly
        // const hash_password = await bcrypt.hash(password, saltRound); for this we wrote in user.model.js


        const userCreated = await User.create({username, email, phone, password});

        res.status(201).json({
            msg: "registration successful", 
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),}); //function call

    } catch (error) {
        // console.log(error);
        // res.status(500).json("internal server error");  //
        console.log(req.body);
        next(error);  //it make sure that it will call directly error middleware instead of client then we send response to client
        //now i will send error from error-middleware 
    }
};

//user login Logic

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});

        if(!userExist) {
            return res.status(400).json({message:"Invalid email address"});
        }

        // const user = await bcrypt.compare(password, userExist.password);  //comparing with previous password which gave during registration
        const user = await userExist.comparePassword(password);  //comparing by making function

        if(user) {
            res.status(200).json({ //200-because we are not creating just login instead checking
                msg: "Login Successful", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),}); //function call
        }else {
            res.status(401).json({message:"Invalid email or password"});
        }

    } catch (error) {
        // res.status(500).json("internal server error");
        next(error);
    }
};

// to send user data - User Logic

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData}); //for passing to fronted
        // res.status(200).json({msg: "hi user"});
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}

module.exports = {home, register, login, user};