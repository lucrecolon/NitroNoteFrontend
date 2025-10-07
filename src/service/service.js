import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api_base_url = 'http://192.168.1.92:8080';

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
    login: `${api_base_url}/login`,
    logout: `${api_base_url}/logout`,
    user: `${api_base_url}/user`,
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


const createVehiculo = async (marca, modelo, patente, kilometros, anio, userId) => {
    
    const body = {
        patente: patente,
        marca: marca,
        modelo: modelo,
        anio: anio,
        kilometros: kilometros,
        usuarioID: userId
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

// Solo los mantenimientos del usuario logueado
export const getMantenimientosUsuario = async () => {
    try {
        const config = await getConfig();
        const { data } = await axios.get(`${api_endpoints.mantenimiento}/mine`, config);
        return data;
    } catch (e) {
        console.error('[getMantenimientosUsuario] error', e.response?.data || e.message);
        return Promise.reject(e);
    }
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
        return data;
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
    try{
        const config = await getConfig();
        const { data } = await axios.patch(`${api_endpoints.mantenimiento}/${id}/finalizar`,{}, config);
        return data;
    }
    catch(e){
        return Promise.reject(e.response)
    }
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
    try{
        const config = await getConfig();
        const { data } = await axios.put(`${api_endpoints.vehiculo}`, payload, config);
        return data;
    }catch(e){
        Promise.reject(e.response);
    }
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

export const logout = async () => {
    try {
        const config = await getConfig();
        const { data } = await axios.post(`${api_endpoints.logout}`, {}, config);
        await AsyncStorage.removeItem("token");
        return data;
    } catch (e) {
        console.error("No se pudo cerrar sesión", e.response);
    }
};

export const getUserAllvehiculos = async (id) => {
    try{
        const config = await getConfig();
        const {data} = await axios.get(`${api_endpoints.vehiculo}/${id}`, config);
        return data;
    }
    catch(e){
        return Promise.reject(e)
    }
}

export const getUser = async () =>{
    try{
        const config = await getConfig();
        return await axios.get(`${api_endpoints.user}`, config)
    }
    catch(e){
        return Promise.reject(e)
    }
}

const updateUser = async (payload) => {
    try {
        const config = await getConfig();
        const { data } = await axios.put(`${api_endpoints.user}`, payload, config);
        return data;
    } catch (err) {
        if (err.response?.status === 400 && err.response?.data === "La contraseña debe tener más de 8 caracteres") {
            throw new Error("La contraseña debe tener más de 8 caracteres");
        }
        if (err.response?.status === 409 && err.response?.data === "El email ya se encuentra registrado") {
            throw new Error("El email ya se encuentra registrado");
        }
        return Promise.reject(err.response || err);
    }
};



export const updateNotificationEmailPreferences = async (prefs) => {
    try {
        const config = await getConfig();
        const { data } = await axios.patch(`${api_endpoints.user}/notification-preferences`,
            prefs, // { emailEnabled: true/false }
            config
        );
        return data;
    } catch (err) {
        return Promise.reject(err.response || err);
    }
};


const Api = {
    register,
    login,
    logout,
    getUser,
    getUserAllvehiculos,
    getAllvehiculos,
    createVehiculo,
    getAllMantenimientos,
    getMantenimientosUsuario,
    getMantenimientoById,
    createMantenimiento,
    updateMantenimiento,
    finalizarMantenimiento,
    deleteMantenimiento,
    deleteVehicleByPatent,
    updateVehiculo,
    updateUser,
    updateNotificationEmailPreferences
}

export default Api;


