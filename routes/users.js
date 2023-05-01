const express = require("express");
var router = express.Router();
const user = require("../controller/user.controller");

module.exports = (app) => {
    router.post("/login", user.adminLogin);
    router.post("/register", user.adminRegister);

    
    app.use("/", router);
};
