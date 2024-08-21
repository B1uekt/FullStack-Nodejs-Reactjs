const db = require('../models/index')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async (firstName, lastName, email, password) => {
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds)

        let result = await db.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = { createUser }