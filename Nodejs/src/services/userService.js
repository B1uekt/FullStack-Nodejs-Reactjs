require("dotenv").config()
const db = require('../models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUser = async (firstName, lastName, email, password) => {
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds)

        let result = await db.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            role: 'USER',
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        const user = await db.User.findOne({
            where: {
                email: email,
            }
        })
        if (user) {
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 1,
                    EM: "Password không hợp lệ"
                }
            }
            else {
                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role

                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    access_token,
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        address: user.address,
                        role: user.role,
                    },
                    EC: 0,
                };

            }
        }
        else {
            return {
                EC: 1,
                EM: "Emai/Password không hợp lệ"
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await db.User.findAll({
            attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'address', 'role', 'gender'],
            order: [
                ['id', 'DESC'],
            ]
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const addNewUser = async (firstName, lastName, email, password, role, phone, address) => {
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds)

        let result = await db.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            role: role,
            phone: phone,
            address: address,
        })
        return {
            result,
            EC: 0,
            EM: "New user created successfully"
        };

    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: "Cannot create new user"
        };
    }
}

const deleteUserwithId = async (userId) => {
    try {

        let result = await db.User.destroy({
            where: {
                id: userId,
            },
        });
        return {
            result,
            EC: 0,
            EM: "Successful to delete user"
        }
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: "Cannot delete user"
        };
    }
}

const updateUserwithId = async (id, firstName, lastName, role, phone, address) => {
    try {

        let result = await db.User.update(
            {
                firstName: firstName,
                lastName: lastName,
                role: role,
                phone: phone,
                address: address
            },
            {
                where: {
                    id: id,
                },
            },
        );
        return {
            result,
            EC: 0,
            EM: "Successful to update user"
        }
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: "Cannot delete new user"
        };
    }
}
module.exports = { createUser, loginService, getUserService, addNewUser, deleteUserwithId, updateUserwithId }