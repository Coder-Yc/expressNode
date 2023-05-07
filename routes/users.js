const express = require("express");
var router = express.Router();
const user = require("../controller/user.controller");
const data = require("../controller/data.controller");

module.exports = (app) => {
    router.post("/login", user.adminLogin);
    router.post("/register", user.adminRegister);
    router.post("/save", data.saveJson)
    router.post('/getData', data.getJson)

    app.use("/", router);
};
