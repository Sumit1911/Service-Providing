const mongoose = require("mongoose");
const bcrypt = require("bcrypt");  //for providing hash to password
const jwt = require("jsonwebtoken");  //for generating token

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
    },
    phone: {
        type:String,
        require:true,
    },
    password: {
        type:String,
        require:true,
    },
    isAdmin: {
        type:Boolean,
        default:false,
    },
});


//secure the password with the bcrypt
userSchema.pre('save', async function(next) { //pre- this function will run before the userCreated function in the auth-controller.js, before saving the data.
    //console.log(this); // we get our data inside the terminal
    const user = this;  //we have all the data inside the 'this'

    if(!user.isModified('password')) { //if password is not modified then already we bcrypted
        next(); //move on the next step to storing in database
    }

    try { //for the first time bcrypt the password
        const saltRound = await bcrypt.genSalt(10); //it is used for hashing the password we can take any number, will take time accordingly
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

//compare password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

//json web token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({  //payload(userIdentity)
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,  //signature
        {expiresIn: "30d",}
        );
    } catch (error) {
        console.error(error);
    }
};
//methods, through this we can create any number of function and can excess in any page

//define the model or the collection name
const User = mongoose.model("User", userSchema); //collection-name with starting with capital, schema-name

module.exports = User;