import axios from "../util/axiosCusomize"

const fetchListUser = () => {
    return axios.get("v1/api/user")
}
export default fetchListUser