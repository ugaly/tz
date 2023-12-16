import axios from "axios";
import { AsyncStorage } from '@react-native-async-storage/async-storage';




// const base_url = 'http://kopakwetu.co.tz:8000/api/'
/*const base_url = 'http://127.0.0.1:8000/api/'*/
// const base_url = 'http://192.168.43.169:8005/tz/'
const base_url = 'http://192.168.100.55:8000/tz/'


export default  class  API {
    static ax = axios // tukiika API.ax mean tumeita na configurations zote
}

//huku ni configuration tu za axios

axios.defaults.baseURL = base_url
axios.defaults.headers.common['Authorization']='Bearer '
// +AsyncStorage.getItem("access") //after kizingiti{Barrier}kuna gep
axios.defaults.timeout.valueOf(86400000)
axios.interceptors.request.use(config=>{
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    setTimeout(()=>source.cancel('Timed out after 30s'), 86400000);
    return config;
});