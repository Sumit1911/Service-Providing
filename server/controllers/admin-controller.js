const User = require("../models/user.model");
const Contact = require("../models/contact-model");

/**
 getAllUsers logic
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {password:0});
        // console.log(users);
        if(!users || users.length === 0) {
            return res.status(404).json({message : "No Users Found"});
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

/**delete user's data */
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;  //to get user's id
        await   User.deleteOne({_id: id});
        return res.status(200).json({message: "User Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}

/**
 getAllContacts logic
 */
const getAllContacts = async(req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length === 0) {
            return res.status(404).json({message : "No Contacts Found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

module.exports = {getAllUsers, getAllContacts, deleteUserById};