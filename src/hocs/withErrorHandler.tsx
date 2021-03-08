import React, { Fragment, useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import useAuth from '../contexts/auth';
import { useHistory } from 'react-router-dom';
import { HttpResponseError, HttpStatusCode } from '../services/api';

const withErrorHandler = (WrappedComponent: React.FC, axios: AxiosInstance) => {
    return (props: any) => {

        const { signOut } = useAuth();
        const history = useHistory();

        const signOutUserAndRedirectToLogin = (): void => {
            signOut();
            history.push("/");
        }

        const onRejectHandler = (error: any): Promise<Error> => {
            console.log("interceptor error");

            // if (!error.response) {
            //     // toast.error("Ops, parece que algo deu errado. Tente novamente em instântes.");
            //     // return Promise.reject(error);
            //     return new Promise(() => { });
            // }

            // if (error.response.status === HttpStatusCode.Unauthorized) {
            //     signOutUserAndRedirectToLogin();
            //     return new Promise(() => { });
            // }

            return Promise.reject(error.response ? new HttpResponseError(error.response.data) : error);
        }

        useEffect(() => {
            axios.interceptors.response.use(
                res => res,
                error => onRejectHandler(error));
        });

        return (
            <Fragment>
                {/* <ToastContainer /> */}
                <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;