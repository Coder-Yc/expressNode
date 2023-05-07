const query = require("./db");

class Data {
    constructor(info) {
        this.userID = info.userID;
        this.jsonData = info.newData;
    }

    async saveJsonDataByUserId() {
        try {
            const res = await query(
                "INSERT INTO data (`user_id`, `json_container`, `json_block`, `created_at`, `updated_at`) VALUES(?,?,?,?,?)",
                [this.userID, this.jsonData.container, this.jsonData.block, new Date(), new Date()]
            );
            console.log("保存成功 ", res);
            return res;

        } catch (err) {
            console.log("error: ", err);
            throw err;
        }
    }

    async getJsonDataByUserId() {
        try {
            const res = await query(
                "SELECT * FROM data WHERE user_id = ?",
                [this.userID]
            );
            console.log("查询成功 ", res);
            return res;

        } catch (err) {
            console.log("error: ", err);
            throw err;
        }
    }
}
module.exports = Data;
