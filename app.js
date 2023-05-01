const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./model/db");

var corsOptions = {
    origin: "http://127.0.0.1:8080",
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/users");

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
userRouter(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
