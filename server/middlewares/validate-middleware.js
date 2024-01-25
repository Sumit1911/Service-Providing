
//here validate is middleware
const validate = (schema) => async (req, res, next) => { //schema is signup schema
    try {
        const parseBody = await schema.parseAsync(req.body); //parseAsync(req.body) will check data is matching or not.
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;

        const error = {
            status, 
            message,
            extraDetails,
        }
        console.log(error);
        // res.status(400).json({msg: message});
        next(error);
    }
};

module.exports = validate;