import axios from "axios";


export const api = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:8000",

});



api.interceptors.request.use(
(config)=>{

  const storage =
    localStorage.getItem(
      "synapse-auth"
    );


  if(storage){

    const parsed =
      JSON.parse(storage);


    if(parsed.state.token){

      config.headers.Authorization =
      `Bearer ${parsed.state.token}`;

    }

  }


  return config;

});