const User = require("../model/user.model");

exports.adminLogin = async (req, res) => {
    console.log("-------------------登陆中");
    let data;
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        console.log(username, password);
        data = await user.findByUsernameAndPassword(username, password);
        res.send(data);
    } catch (error) {
        if (data.kind === "not_found") {
            res.status(400).send({
                message: "Invalid username or password.",
            });
        } else {
            res.status(500).send({
                message:
                    "Error retrieving user with username and password----------- " +
                    error,
            });
        }
    }
};

exports.adminRegister = async (req, res) => {
    console.log("-------------------注册中");
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });
        const data = await user.createUser(username, password, email);
        res.send(data);
    } catch (error) {
        if (data.kind === "not_found") {
            res.status(400).send({
                message: "Invalid username or password.",
            });
        } else if (data.kind === "has_account") {
            res.status(400).send({
                message: "You have create account",
            });
        } else {
            res.status(500).send({
                message:
                    "Error retrieving user with username and password " + error,
            });
        }
    }
};
