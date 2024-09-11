import axios from "../util/axiosCusomize"

const fetchListUser = () => {
    return axios.get("v1/api/user")
}

const postCreateUser = (firstName, lastName, email, password, role, phone, address) => {
    return axios.post("v1/api/createUser", { firstName, lastName, email, password, role, phone, address })
}
export { fetchListUser, postCreateUser }