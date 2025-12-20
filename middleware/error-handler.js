function errorHandler(err, req, res, next){
    console.log(err)
    if (err.message.includes("UNIQUE")) {
        return res.status(409).json({
            error:"Resource already exist"
        });
    }
    res.status(500).json({error:"Internal server error",errorMessage:err.message});
}
module.exports = errorHandler;