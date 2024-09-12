const express = require('express')
const { CreateUser, handleLogin, getUser, postAddNewUser, deleteUser } = require('../controllers/userController')
const { delay } = require('../middleware/delay')
const { auth, checkRole } = require('../middleware/auth')

const routerAPI = express.Router()

routerAPI.all("*", auth)

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

routerAPI.get("/user", checkRole, getUser);
routerAPI.post("/register", CreateUser)
routerAPI.post("/login", handleLogin)
routerAPI.post("/createUser", checkRole, postAddNewUser)
routerAPI.delete("/deleteUser", checkRole, deleteUser)
module.exports = routerAPI