import axios from 'axios';
import env from "react-dotenv";
import store from '../store';


axios.interceptors.request.use(
    (config) => {
        console.log('token', store.getState())
        const state = store.getState();
        const token = state?.app?.user?.token || '';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        //config.headers.agentFrom = 'mobile';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const convierteGeoJsonHttp = async (): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/convierteGeoJson"}`, {}
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const getAllProyectosHttp = async (id_usuario: any): Promise<any> => {
    try {
        const response: any = await axios.get(
            `${env.API_URL}${"/getAllProyectos"}?id_usuario=${id_usuario}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const storeProyectoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/storeProyecto"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const updateProyectoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/updateProyecto"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const deleteProyectoHttp = async (id: any): Promise<any> => {
    try {
        const response: any = await axios.delete(
            `${env.API_URL}${"/deleteProyecto"}?id=${id}`
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const asociaUsuarioProyectoHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/asociaUsuarioProyecto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};

export const eliminaAsociacionUsuarioProyectoHttp = async (data:any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/eliminaAsociacionUsuarioProyecto"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const setReporteHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/setReporte"}`, data, { headers: { "Content-Type": "multipart/form-data", } }
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};


export const deleteReporteHttp = async (data: any): Promise<any> => {
    try {
        const response: any = await axios.post(
            `${env.API_URL}${"/deleteReporte"}`, data
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};