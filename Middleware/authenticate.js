
const jwt = require('jsonwebtoken')
const User = require('../Model/userSchema')
const cookie = require('cookie');





//middleware
const Authenticate = async (req, res, next) => {
    
        
//chatgpt
try {
    console.log('I am middleware');
    // Extract the JWT token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }
    const jwtToken = authHeader.split(' ')[1]; // Get the token part after 'Bearer '

    // Verify the JWT token using the SECRET_KEY
    const verifyToken = jwt.verify(jwtToken, process.env.SECRET_KEY);

    // Find the user associated with the verified token
    const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": jwtToken });
    if (!rootUser) {
      throw new Error("User not found in database after accessing the token");
    }
    
    // Attach token, user, and user ID to the request object
    req.jwtToken = jwtToken;
    req.rootUser = rootUser;
    req.userid = rootUser._id;



        // const jwtCookieName = 'jwtoken';

        // Get the JWT token from cookies
        // const jwtToken = req.body;
        // consol.log("jet token in authenticate",jwtToken)

        // if (jwtToken) {
        //     console.log("jwtoken",jwtToken);

        // } else {
        //     console.log('JWT Token not found in cookies');
        // }

        // const verifyToken = jwt.verify(jwtToken, process.env.SECRET_KEY);
        // //now we have to find the user jiska token generate howa hy 
        //const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": jwtToken });
        //root user contains all the data of a person
        //   console.log(rootUser)
        // if (!rootUser) {
        //     throw new Error("user not found in database after accessing the token")
        // }
        // req.jwtToken = jwtToken
        // req.rootUser = rootUser
        // req.userid = rootUser._id

        next(); // Move to the next middleware/route
        
    }
    catch (error) {
      res.send("404")
        console.error("okkkkk"+error);
        next(error);
    }







    // function getCookieValues(cookieString, key) {
    //     const cookies = cookie.parse(cookieString);
    //     return cookies[key];
    //   }

    //   // Example usage
    //   const cookieString = 'jwtoken';
    //   const key = 'jwtoken';
    //   //const value = getCookieValue(cookieString, key);

    //   console.log(value); // Outputs: value2

    //try{

    // neww
    //     var jwt = "jwtoken";
    //   const   getCookieValue = (cookieName)=>
    //     {
    //         var cookies = cookie.parse(cookieName);//.split(';');
    //         for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
    //             var cookie = cookies_1[_i];
    //             var _a = cookie.trim().split('='), name = _a[0], value = _a[1];
    //             if (name === cookieName) {
    //                 return value;
    //             }
    //         }
    //         return '';
    //     }

    //             const token=  
    //             getCookieValue(jwt);
    //new     
    //Cookies.get(jwt)
    //document.cookie("jwtoken");
    // console.log(token)
    // console.log("hammad")
    //next()

    // }
    // catch(error){
    //     console.log('unAuthrized user')
    // }

}



module.exports = Authenticate