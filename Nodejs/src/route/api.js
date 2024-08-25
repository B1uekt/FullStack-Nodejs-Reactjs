const express = require('express')
const { CreateUser, handleLogin, getUser } = require('../controllers/userController')
const { delay } = require('../middleware/delay')

const routerAPI = express.Router()

routerAPI.get("*", delay)

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

routerAPI.post("/register", CreateUser)
routerAPI.post("/login", handleLogin)

routerAPI.get("/user", getUser);

module.exports = routerAPI