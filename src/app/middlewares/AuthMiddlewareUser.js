const jwt = require('jsonwebtoken')
const AuthMiddlewareUser = {
    //verifytoken
    verifytoken: (req, res, next) => {
        //token is access token
        // const token = req.headers.token;
        //code web monolithic, có thể set accesstoken lên cookie luôn(như thế dễ làm nhưng không bảo mật :))), nếu đúng thì chỉ lưu refresh token lên cookie rồi từ refesh token tạo lại accessToken)

        const token = req.cookies.user_access_token;
        console.log(token)
        if (token) {
            //bearer (if set in header)
            // const accessToken = token.split(" ")[1];
            const accessToken = token;
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, result) => {
                if (err) {
                    //return to login
                    res.status(403).json({ status: false, mess: "token is not valid !" });
                } else {
                    if (result.data) {
                        next();
                    }
                }
            })
        } else { 
            res.status(200).json({ status: false, mess: "you are not authenticated !" });
        }
    }
}
module.exports = AuthMiddlewareUser; 