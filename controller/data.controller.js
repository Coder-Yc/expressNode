const Data = require("../model/data.model");

exports.saveJson = async (req, res) => {
    console.log("-------------------保存数据");
    req.headers['content-type'] = 'application/json'
    let resData;
    try {
        let { userID, container, block } = req.body;
        container = JSON.stringify(container)
        block = JSON.stringify(block)
        const newData = { container, block }
        const data = new Data({ userID, newData });
        // console.log(userID, jsonData)
        resData = await data.saveJsonDataByUserId();
        res.setHeader('Content-Type', 'application/json');
        res.send(resData);
    } catch (error) {
        console.error("保存数据出错:", error);
        res.status(500).send("保存数据时发生错误");
    }
};

exports.getJson = async (req, res) => {
    console.log("-------------------获取数据");
    let resData;
    try {
        let { userID } = req.body;
        const data = new Data({ userID });
        resData = await data.getJsonDataByUserId();
        res.send(resData);
    } catch (error) {
        console.error("保存数据出错:", error);
        res.status(500).send("保存数据时发生错误");
    }
};

