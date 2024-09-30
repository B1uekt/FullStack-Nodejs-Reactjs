import axios from "../util/axiosCusomize"

const getAllType = () => {
    return axios.get("v1/api/type/all")
}
export { getAllType }