import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

API.interceptors.request.use(
    (config)=>{
        const publicPaths = ["/auth/register","/auth/login"];

        const requestUrl=config.url ? config.url.toLowerCase() :"";

        const isPublic =publicPaths.some((path)=>requestUrl.startsWith(path));

        const token=localStorage.getItem("token");

        console.log("[api] request url:",config.url);
        console.log("[api]is public route:",isPublic);
        console.log("[api] token found:",token ? "YES" : "NO");



        if(token && !isPublic){
            config.headers.Authorization =`Bearer ${token}`;
            console.log("[api]authorization header set");
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }

    
);
export default API;