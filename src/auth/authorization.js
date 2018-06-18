var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    var apiToken = req.headers["x-api-token"];
    jwt.verify(apiToken,"anypk",(err,decod)=>{
        if(err){
            console.log(decod);
            res.status(403).json({message:"Wrong Token"});
        }else{
            console.log(decod);
          //If decoded then call next() so that respective route is called.
          req.decoded=decod;
          next();
        }
      });
} 