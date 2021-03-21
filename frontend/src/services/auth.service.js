import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
    login(username , password) {
        return axios.post(API_URL + "login" , {username , password}).then((response) => {
            console.log(response);
            if(response.data.accessToken) {
                localStorage.setItem("user" , JSON.stringify(response.data));
            }
            return response.data;
        })
    }

    logout() {
        localStorage.removeItem("user");
    }

    Adminlogin(username , password) {
        return axios.post(API_URL + "admin/login" , {username , password}).then((response) => {
            console.log(response);
            if(response.data.accessToken) {
                localStorage.setItem("user" , JSON.stringify(response.data));
            }
            return response.data;
        })
    }

    register(username, firstname , lastname , email , password) {
         return axios.post(API_URL + "signup", {
             username,
             firstname,
             lastname,
             email,
             password,
         })
    }
}

export default new AuthService();