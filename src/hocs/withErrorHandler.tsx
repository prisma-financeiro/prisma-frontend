import React, { Fragment, useState, useEffect } from 'react';
import { AxiosInstance } from 'axios';
import useAuth from '../contexts/auth';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";

const withErrorHandler = (WrappedComponent: React.FC, axios: AxiosInstance) => {
    return (props: any) => {

        const [error, setError] = useState<string>('');
        const { signOut } = useAuth();
        const history = useHistory();

        useEffect(() => {

            axios.interceptors.response.use(
                res => res,
                error => {
                    if (error.response.status === 401) {
                        signOut();
                        toast.error("Sua sessão foi encerrada, faça login novamente.");
                        history.push("/");
                    } else {
                        setError(error.message);
                    }
                    return new Promise(() => { });
                });

        });

        const errorConfirmedHandler = () => {
            setError('');
        }

        return (
            <Fragment>
                {/* TODO: Substituir por um Toast. */}
                {/* <Modal
                    title="Aviso"
                    showButtons={false}
                    show={!!error}
                    modalClosed={errorConfirmedHandler}
                    modalConfirmed={errorConfirmedHandler}>
                    {error}
                </Modal> */}
                <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;