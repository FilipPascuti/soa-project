import {createContext, useCallback, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {login as loginApi, register} from "./authApi"

type LoginFn = (email?: string, password?: string) => void;
type RegisterFn = (email?: string, password?: string, name?:string) => void;
type LogoutFn = () => void;

export interface AuthState {
    isAuthenticated: boolean,
    isRegistered: boolean,
    pendingAuthentication?: boolean,
    isAuthenticating: boolean,
    authenticationError: Error | null;
    login?: LoginFn,
    logout?: LogoutFn,
    register?: RegisterFn,
    email?: string,
    password?: string,
    token: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    isRegistered: false,
    isAuthenticating: false,
    pendingAuthentication: false,
    authenticationError: null,
    token: ""
}

export const AuthContext = createContext<AuthState>(initialState);

interface AuthProviderProps {
    children: PropTypes.ReactNodeLike
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [state, setState] = useState<AuthState>(initialState);
    const {isAuthenticated, isRegistered, isAuthenticating, pendingAuthentication, authenticationError, token, email, password} = state

    const login = useCallback<LoginFn>(loginCallback, []);
    const logout = useCallback<LogoutFn>(logoutCallback, []);

    useEffect(authinticationEffect, [pendingAuthentication]);
    const value = {isAuthenticated, isRegistered, isAuthenticating, authenticationError, email, password, token, login, logout, register:registerCallback};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

    async function registerCallback(email?: string, password?: string, name?:string) {
        try{
            const result = await register(email, password, name);
            setState({
                ...state,
                isRegistered: true,
            })
        } catch (error: any){
            console.log(error);
        }

    }


    function loginCallback(email?: string, password?: string) {
        setState({
            ...state,
            pendingAuthentication: true,
            email,
            password
        });
    }

    function logoutCallback() {
        setState({
            ...state,
            token: "",
            isAuthenticated: false
        });
    }

    function authinticationEffect() {
        let canceled = false;

        authenticate();

        return () => {
            canceled = true;
        }

        async function authenticate() {
            if (!pendingAuthentication) {
                console.log('authenticate, !pendingAuthentication, return');
                return;
            }
            try {
                console.log('authenticate');
                setState({
                    ...state,
                    isAuthenticating: true
                });
                const {email, password} = state;
                const { token: access_token  } = (await loginApi(email, password))?.data;
                console.log(`access token ${access_token}`)
                if (canceled) {
                    return;
                }
                console.log('authenticate succeeded');
                setState({
                    ...state,
                    token: access_token,
                    pendingAuthentication: false,
                    isAuthenticating: false,
                    isAuthenticated: true
                })
            } catch (error: any) {
                if (canceled) {
                    return;
                }
                console.log('authentication failed');
                setState({
                    ...state,
                    authenticationError: error,
                    pendingAuthentication: false,
                    isAuthenticating: false,
                })
            }
        }
    }
};

export const useAuth = () => {
    return useContext(AuthContext);
}
