const express = require('express')
const { CreateUser } = require('../controllers/userController')

const routerAPI = express.Router()

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

routerAPI.post("/register", CreateUser)
module.exports = routerAPI