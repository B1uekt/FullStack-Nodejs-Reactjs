import axios from "../util/axiosCusomize"

const fetchListUser = () => {
    return axios.get("v1/api/user")
}

const postCreateUser = (firstName, lastName, email, password, role, phone, address) => {
    return axios.post("v1/api/createUser", { firstName, lastName, email, password, role, phone, address })
}

const deleteUser = (userId) => {
    return axios.delete("v1/api/deleteUser", { data: { userId: userId } })
}

const putUpdateUser = (id, firstName, lastName, role, phone, address) => {
    return axios.put("v1/api/updateUser", { id, firstName, lastName, role, phone, address })
}
export { fetchListUser, postCreateUser, deleteUser, putUpdateUser }