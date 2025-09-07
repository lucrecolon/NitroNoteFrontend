import axios from 'axios';


const api_base_url = 'http://192.168.1.33:8080';

const api_endpoints = {
    vehiculo: `${api_base_url}/vehiculo`,
    mantenimiento: `${api_base_url}/mantenimiento`
}

//Vehiculo
const getAllvehiculos = async () => {

    try{
        const {data} = await axios.get(`${api_endpoints.vehiculo}`)
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
        const {data} = await axios.post(`${api_endpoints.vehiculo}`, body)
        return data
    }
    catch(e){
        return Promise.reject(e);
    } 
}

//Mantenimiento

// GET /mantenimiento   → lista todos
export const getAllMantenimientos = async () => {
    const { data } = await axios.get(`${api_endpoints.mantenimiento}/all`);
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
        const { data } = await axios.post(api_endpoints.mantenimiento, payload);
        return data; // puede ser el id generado o el objeto creado, según tu back
    } catch (err) {
        console.error('[createMantenimiento] error', err.response?.data || err.message);
        throw err;
    }
};

// PUT /mantenimiento/{id}  (editar campos)
export const updateMantenimiento = async (id, payload) => {
    const { data } = await axios.put(`${api_endpoints.mantenimiento}/${id}`, payload);
    return data;
};

// PATCH /mantenimiento/{id}/complete  (si tenés endpoint para marcar hecho)
export const finalizarMantenimiento = async (id) => {
    const { data } = await axios.patch(`${api_endpoints.mantenimiento}/${id}/finalizar`);
    return data;
};

// DELETE /mantenimiento/{id}
export const deleteMantenimiento = async (id) => {
    await axios.delete(`${api_endpoints.mantenimiento}/${id}`);
    return true;
};


const Api = {
    getAllvehiculos,
    createVehiculo,
    getAllMantenimientos,
    getMantenimientoById,
    createMantenimiento,
    updateMantenimiento,
    finalizarMantenimiento,
    deleteMantenimiento,
}

export default Api;


