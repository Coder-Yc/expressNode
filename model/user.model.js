const query = require("./db");

class User {
    constructor(user) {
        this.name = user.name;
        this.password = user.password;
    }

    async createUser(username, password, email) {
        let hasAccount = false;

        const user = {
            username,
            password,
            email,
            created_at: new Date(),
            updated_at: new Date(),
        };

        try {
            const result = await this.findByUsernameAndPassword(
                user.username,
                user.password
            );
            console.log(result, "-----");
            if (result.id) {
                hasAccount = true;
            }
            if (hasAccount) {
                console.log("已经注册了账号");
                return { kind: "has_account" };
            }

            const res = await query(
                "INSERT INTO users ( `username`, `password`, `email`, `created_at`, `updated_at` )VALUES(?,?,?,?,?)",
                [
                    user.username,
                    user.password,
                    user.email,
                    user.created_at,
                    user.updated_at,
                ]
            );
            // console.log(res, "-----------");
            console.log("create user:", { id: res.insertId, username });
            return { id: res.insertId, username };
        } catch (err) {
            console.log("error", err);
            throw err;
        }
    }

    async findByUsernameAndPassword(username, password) {
        try {
            const res = await query(
                "SELECT * FROM users WHERE username = ? AND password = ?",
                [username, password]
            );

            if (res.length) {
                console.log("found user: ", res[0]);
                return res[0];
            }

            return { kind: "not_found" };
        } catch (err) {
            console.log("error: ", err);
            throw err;
        }
    }
}
module.exports = User;
