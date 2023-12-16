import API from "../api";






export default class AuthService{
    static login(payload){
       /* axios.post("http://localhost:8000/api/login",payload,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Kizingiti '+sessionStorage.getItem("access")
            }
        })*/
        return API.ax.post('login',payload).catch(e=>console.log(e))
    }
   

   


    static loadPlace(){
        return API.ax.get('places').catch(e=>console.log(e))
    }

    static searchPlace(location){
        return API.ax.get(`places/${location}/`).catch(e=>console.log(e))}

    static loadPost(){
        return API.ax.get('posts').catch(e=>console.log(e))
    }

    static loadNextPage(page) {
        return API.ax.get("http://192.168.100.55:8005/tz/posts?page=2").catch((e) => console.log(e));
      }

    static loadPostByLocation(location){
        return API.ax.get(`posts/${location}`).catch(e=>console.log(e))
    }

    static loadRecommended(){
        return API.ax.get(`recommended`).catch(e=>console.log(e))
    }
   


}