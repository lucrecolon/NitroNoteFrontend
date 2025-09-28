import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api_base_url = 'http://192.168.1.33:8080';

const getConfig = async () => {
    const token = await AsyncStorage.getItem('token');
    return {
        headers: {
            'Authorization': "Bearer " +token,
        },
    };
};

const api_endpoints = {
    vehiculo: `${api_base_url}/vehiculo`,
    mantenimiento: `${api_base_url}/mantenimiento`,
    register: `${api_base_url}/register`,
    login: `${api_base_url}/login`
}

//Vehiculo
export const getAllvehiculos = async () => {

    try{
        const {data} = await axios.get(`${api_endpoints.vehiculo}/all`)
        return data
    }
    catch(e){
        return Promise.reject(e);
    }
};


const createVehiculo = async (marca, modelo, patente, kilometros, anio) => {
    
    const body = {
        patente: patente,
        marca: marca,
        modelo: modelo,
        anio: anio,
        kilometros: kilometros
    }
    try{
        const config = await getConfig();
        const {data} = await axios.post(`${api_endpoints.vehiculo}`, body, config)
        return data
    }
    catch(e){
        return Promise.reject(e);
    } 
}

//Mantenimiento

// GET /mantenimiento   → lista todos
export const getAllMantenimientos = async () => {
    const config = await getConfig();
    const { data } = await axios.get(`${api_endpoints.mantenimiento}/all`, config);
    return data;
};

// GET /mantenimiento/{id}
export const getMantenimientoById = async (id) => {
    try {
        const { data } = await axios.get(`${api_endpoints.mantenimiento}/${id}`);
        return data;
    } catch (err) {
        console.error(`[getMantenimientoById] error con id=${id}`, err.response?.data || err.message);
        throw err;
    }
};

// POST /mantenimiento
export const createMantenimiento = async (payload) => {
    try {
        const config = await getConfig();
        const { data } = await axios.post(`${api_endpoints.mantenimiento}/${payload.vehiculoId}`, payload, config);
        return data; // puede ser el id generado o el objeto creado, según tu back
    } catch (err) {
        console.error('[createMantenimiento] error', err.response?.data || err.message);
        throw err;
    }
};

// PUT /mantenimiento/{id}  (editar campos)
export const updateMantenimiento = async (id, payload) => {
    const config = await getConfig();
    const { data } = await axios.put(`${api_endpoints.mantenimiento}/${id}`, payload, config);
    console.log(data);
    return data;
};


// PATCH /mantenimiento/{id}/complete  (si tenés endpoint para marcar hecho)
export const finalizarMantenimiento = async (id) => {
    const config = await getConfig();
    const { data } = await axios.patch(`${api_endpoints.mantenimiento}/${id}/finalizar`, config);
    return data;
};

// DELETE /mantenimiento/{id}
export const deleteMantenimiento = async (id) => {
    const config = await getConfig();
    await axios.delete(`${api_endpoints.mantenimiento}/${id}`, config);
    return true;
};

// DELETE /vehiculo/{id}
export const deleteVehicleByPatent = async (patente) => {
    const config = await getConfig();
    await axios.delete(`${api_endpoints.vehiculo}/${patente}`, config);
};
// PUT /vehiculo/{id}  (editar campos)
export const updateVehiculo = async (payload) => {
    const config = await getConfig();
    const { data } = await axios.put(`${api_endpoints.vehiculo}`, payload, config);
    console.log(data);
    return data;
};

const register = async (name, email, pass) => {
    const body = {
        nombre: name,
        email: email, 
        password: pass
    }
    try{
        await axios.post(`${api_endpoints.register}`, body);
        return;
    }
    catch(e){
        return Promise.reject(e);
    }
}

const login = async (email, pass) =>{
    const body={
        email: email,
        password: pass
    }

    try{
        const {data} = await axios.post(`${api_endpoints.login}`, body);
        await AsyncStorage.setItem('token', data.token);
        return data.user;
    }catch(e){
        return Promise.reject(e);
    }
}

const Api = {
    register,
    login,
    getAllvehiculos,
    createVehiculo,
    getAllMantenimientos,
    getMantenimientoById,
    createMantenimiento,
    updateMantenimiento,
    finalizarMantenimiento,
    deleteMantenimiento,
    deleteVehicleByPatent,
    updateVehiculo
}

export default Api;


