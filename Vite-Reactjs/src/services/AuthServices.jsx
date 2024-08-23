import axios from "../util/axiosCusomize"

const postRegister = (firstName, lastName, email, password) => {
    return axios.post("/v1/api/register", { firstName: firstName, lastName: lastName, email: email, password: password })
}

const postLogin = (email, password) => {
    return axios.post("v1/api/login", { email: email, password: password })
}
export { postRegister, postLogin }