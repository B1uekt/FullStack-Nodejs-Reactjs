const { createUser, loginService, getUserService, addNewUser } = require("../services/userService")

const CreateUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const data = await createUser(firstName, lastName, email, password)

    return res.status(200).json(data)
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const data = await loginService(email, password)

    return res.status(200).json(data)
}

const getUser = async (req, res) => {
    const data = await getUserService()

    return res.status(200).json(data)
}

const postAddNewUser = async (req, res) => {
    const { firstName, lastName, email, password, role, phone, address } = req.body

    const data = await addNewUser(firstName, lastName, email, password, role, phone, address)

    return res.status(200).json(data)
}
module.exports = { CreateUser, handleLogin, getUser, postAddNewUser }