const { createUser, loginService } = require("../services/userService")

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

module.exports = { CreateUser, handleLogin }