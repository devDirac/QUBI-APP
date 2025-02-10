import { LoginAction, UserD } from "../componets/LoginForm/types";
import axios from 'axios';
import env from "react-dotenv";
import store from '../store';
export const SET_USER = "@SET_USER";
export const RESET_STATE = "@RESET_STATE";

export const setUser = (user: LoginAction) => {
  return {
    type: SET_USER,
    value: user,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};



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

/* axios.interceptors.response.use(
  (response:any) => {
    return response;
  },
  (error:any) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      return axios.get(`${env.API_URL_SANCTUM}sanctum/csrf-cookie`).then((res:any) => {
        if (res.status === 200 || res.status ===  204) {
          return axios(originalRequest);
        }
      });
    } else {
      return Promise.reject(error);
    }
  }
); */

export const setAhut = (token: any) => {
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};

export const loginHttp = async (user: LoginAction): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/login"}`, { usuario: user?.usuario, password: user?.password, valueCaptcha: user?.valueCaptcha }
    );
    setAhut(response?.data?.token);
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const registerHttp = async (user: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/register"}`, user
    );
    setAhut(response?.data?.token);
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const getUsersHttp = async (): Promise<any> => {
  try {
    const response: any = await axios.get(
      `${env.API_URL}${"/getUsers"}`,
    );
    setAhut(response?.data?.token);
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const editUserHttp = async (user: any): Promise<any> => {
  try {
    const response: any = await axios.put(
      `${env.API_URL}${"/editUser"}`, user
    );
    setAhut(response?.data?.token);
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};


export const setActiveUserHttp = async (user: any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/setActiveUser"}`, user
    );
    setAhut(response?.data?.token);
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};







export const logOut = async (): Promise<any> => {
  return axios.post(`${env.API_URL}/logOut`);
};

export const recoverPasswordGenerateToken = async (user: UserD): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/recuperaContrasena"}`, { correo: user?.email }
    );
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const recuperaContrasenaTokenValidacion = async (token: string): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/recuperaContrasenaTokenValidacion"}`, { token }
    );
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const updatePassword = async (contrasena: string, contrasenaConfirm: string, token: string): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/actualizacionContrasena"}`, { contrasena, contrasenaConfirm, token }
    );
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const getUserNuevosAjustes = async (id: number, token: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${env.API_URL}${"/getUserRefrsh"}/${id}?token=${token}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

export const passwordResetSinTokenHTTP = async (contrasena: string, contrasenaConfirm: string, id:any): Promise<any> => {
  try {
    const response: any = await axios.post(
      `${env.API_URL}${"/passwordResetSinToken"}`, { contrasena, contrasenaConfirm, id }
    );
    return response?.data;
  } catch (error) {
    const promise = new Promise((_, reject) => reject(error));
    return promise;
  }
};

