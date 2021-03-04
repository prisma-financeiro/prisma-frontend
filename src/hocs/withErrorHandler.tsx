import React, { Fragment, useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import useAuth from '../contexts/auth';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { HttpStatusCode } from '../services/api';

const withErrorHandler = (WrappedComponent: React.FC, axios: AxiosInstance) => {
    return (props: any) => {

        const { signOut } = useAuth();
        const history = useHistory();
        const [hasBeenSignOut, setHasBeenSignOut] = useState<boolean>(false);

        const signOutUserAndRedirectToLogin = (): void => {
            setHasBeenSignOut(true);
            signOut();
            history.push("/");
            toast.error("Sua sessão foi encerrada, faça login novamente.");
        }

        const onRejectHandler = (error: any): any => {
            console.log("interceptor error");

            if (!error.response) {
                // toast.error("Ops, parece que algo deu errado. Tente novamente em instântes.");
                // return Promise.reject(error);
                return new Promise(() => { });
            }

            if (error.response.status === HttpStatusCode.Unauthorized) {
                !hasBeenSignOut && signOutUserAndRedirectToLogin();
            }

            // return Promise.reject(error);
            return new Promise(() => { });
        }

        useEffect(() => {
            axios.interceptors.response.use(
                res => res,
                error => onRejectHandler(error));
        });

        return (
            <Fragment>
                <ToastContainer />
                <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;