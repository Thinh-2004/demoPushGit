import axios from "axios";
const instance = axios.create({
    baseURL: 'https://poly-java-6-121e4-default-rtdb.firebaseio.com'
});
export default instance;