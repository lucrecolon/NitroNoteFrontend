import axios from 'axios';


const api_base_url = 'http://192.168.19.90:7070';

const api_endpoints = {
    vehiculo: `${api_base_url}/vehiculo`
}

const all_vehiculos = async () => {

    try{
        const vehiculos = await axios.get(`${api_endpoints.vehiculo}`)
        console.log(vehiculos)
        return vehiculos
    }
    catch(e){
        return Promise.reject(e);
    }
};

const Api = {
    all_vehiculos
}

export default Api;