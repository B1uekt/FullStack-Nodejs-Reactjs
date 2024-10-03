const express = require('express')
const { CreateUser, handleLogin, getUser, postAddNewUser, deleteUser, putUpdateUser } = require('../controllers/userController')
const { getAllProduct, postCreateNewProduct, putUpdateProduct, deleteProduct } = require('../controllers/productController')
const { getAllType } = require('../controllers/typeController')
const { delay } = require('../middleware/delay')
const { auth, checkRole } = require('../middleware/auth')
const routerAPI = express.Router()
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routerAPI.all("*", auth)

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

routerAPI.get("/user", checkRole, getUser);
routerAPI.post("/register", CreateUser)
routerAPI.post("/login", handleLogin)
routerAPI.post("/createUser", checkRole, postAddNewUser)
routerAPI.delete("/deleteUser", checkRole, deleteUser)
routerAPI.put("/updateUser", checkRole, putUpdateUser)


routerAPI.get("/collection/all", getAllProduct)
routerAPI.post("/createProduct", checkRole, upload.array('images'), postCreateNewProduct)
routerAPI.put("/updateProduct", checkRole, upload.array('images'), putUpdateProduct)
routerAPI.delete("/deleteProduct", checkRole, deleteProduct)


routerAPI.get("/type/all", getAllType)

module.exports = routerAPI