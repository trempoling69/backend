const checkUserInputAuth = (req, res, callback) => {
    const AuthInfo = new Map([])
    AuthInfo.set("username", req.body.username.replace(/[<>]/g, ""))
    AuthInfo.set("password", req.body.password.replace(/[<>]/g, ""))
    callback(AuthInfo)
}

module.exports = checkUserInputAuth;