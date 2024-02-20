import {baseUrl, config, withLogs} from "../core";
import axios from "axios";


const authUrl = `http://${baseUrl}/auth/login`
const registerUrl = `http://${baseUrl}/auth/register`

export interface AuthProps {
    data: {
        token: string
    }
    result: string;
}

export const login: (email?: string, password?: string) => Promise<AuthProps> =
    (email, password) => {
        return withLogs(axios.post(authUrl, {email, password}), 'login');
    }

export const register: (name?: string, password?: string, email?: string) => Promise<any> =
    (name, password, email) => {

        return withLogs(axios.post(registerUrl, {name, password, email}, config), 'register');
    }
