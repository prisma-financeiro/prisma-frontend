import React, { useState } from 'react';
import Input from '../../components/Input'
import Button from '../../components/Button'
import history from '../../services/history';

import { AccountOptions, ConfirmationModalButtonContainer, Container, FormContainer, InputControl, SpinnerContainer } from './styles';
import { FiLock, FiMail } from 'react-icons/fi';
import * as login from "../../services/login";
import * as signUp from "../../services/signup";
import { HttpResponseError } from "../../services/api";
import useAuth from '../../contexts/auth';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';
import { toast } from "react-toastify";
import PasswordRecoveryModal from './PasswordRecoveryModal';

const KEY_ENTER = "Enter";

const Login = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordRecoveryModalVisible, setIsPasswordRecoveryModalVisible] = useState<boolean>(false);

    const [isAccountNotConfirmedModalVisible, setIsAccountNotConfirmedModalVisible] = useState<boolean>(false);
    const [isLoadingResendConfirmation, setIsLoadingResendConfirmation] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { signed, signIn } = useAuth();

    if (signed) {
        history.push("/home");
    }

    const showLoginErrorMessage = (code: string) => {
        switch (code) {
            case login.SignInExceptions.NotAuthorizedException:
                toast.error("E-mail ou senha inválidos.");
                break;

            case login.SignInExceptions.UserNotConfirmedException:
                setIsAccountNotConfirmedModalVisible(true);
                break;

            default:
                break;
        }
    }

    const handleSignInResponse = (response: any) => {
        setIsLoading(false);
        signIn(response);
        history.push("/home");
    }

    const handleSignInError = (error: HttpResponseError) => {
        setIsLoading(false);
        showLoginErrorMessage(error.code);
    }

    const handleLogin = () => {
        setIsLoading(true);

        login.signIn(email, password)
            .then(response => handleSignInResponse(response))
            .catch((error: HttpResponseError) => handleSignInError(error));
    }

    const handleEmailChange = (email: string) => {
        setEmail(email);
    }

    const handleAccountNotConfirmedModalOK = () => {
        setIsAccountNotConfirmedModalVisible(false);
    }

    const handleAccountNotConfirmedModalResendEmail = () => {
        setIsLoadingResendConfirmation(true);
        signUp.resendConfirmation(email)
            .then(_res => {
                setIsLoadingResendConfirmation(false);
                setIsAccountNotConfirmedModalVisible(false);
                toast.success('E-mail de confirmação reenviado!');
            });
    }

    const handlePasswordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === KEY_ENTER) {
            handleLogin();
        }
    }

    const handleForgotPasswordClick = () => {
        setIsPasswordRecoveryModalVisible(true);
    }

    const handleClosePasswordRecoveryModal = () => {
        setIsPasswordRecoveryModalVisible(false);
    }

    const getPasswordRecoveryModal = () => {
        return (
            <PasswordRecoveryModal
                email={email}
                onClose={() => handleClosePasswordRecoveryModal()}
            />
        )
    }

    const getAccountNotConfirmedModal = () => {
        return (
            <Modal
                title="Ops, falta confirmar seu e-mail!"
                show={isAccountNotConfirmedModalVisible}
                showButtons={false}
                modalClosed={handleAccountNotConfirmedModalOK}
                modalConfirmed={() => { }}
            >
                <p>Por favor verifique sua caixa de e-mail ou spam.</p>
                <p>Caso não tenha recebido, clique em reenvier e-mail.</p>
                <ConfirmationModalButtonContainer>
                    <Button
                        variant="secondary"
                        onClick={() => handleAccountNotConfirmedModalResendEmail()}>
                        {
                            isLoadingResendConfirmation ?
                                <SpinnerContainer>
                                    <Spinner />
                                </SpinnerContainer>
                                : 'Reenviar e-mail'
                        }
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleAccountNotConfirmedModalOK()}>
                        OK
                            </Button>
                </ConfirmationModalButtonContainer>
            </Modal>
        )
    }

    return (
        <Container>
            <FormContainer>
                {
                    isPasswordRecoveryModalVisible &&
                    getPasswordRecoveryModal()
                }
                <h1>Faça seu login</h1>
                <form>
                    {getAccountNotConfirmedModal()}
                    <InputControl>
                        <Input
                            type="email"
                            placeholder="E-mail"
                            icon={<FiMail />}
                            value={email}
                            required={true}
                            onChange={(event) => handleEmailChange(event.target.value)}
                        />
                    </InputControl>
                    <InputControl>
                        <Input
                            type="password"
                            placeholder="Senha"
                            icon={<FiLock />}
                            value={password}
                            required={true}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handlePasswordKeyDown(event)}
                        />
                    </InputControl>
                    <InputControl>
                        <Button
                            variant="primary"
                            onClick={() => handleLogin()}
                            disabled={!email || !password || isLoading}
                        >
                            {
                                isLoading ?
                                    <SpinnerContainer>
                                        <Spinner />
                                    </SpinnerContainer>
                                    : 'Entrar'
                            }
                        </Button>
                    </InputControl>
                    <AccountOptions>
                        <a onClick={() => handleForgotPasswordClick()}>Esqueci minha senha</a>
                        <a href='/signup'>Ainda não tem uma conta? Crie uma conta aqui.</a>
                    </AccountOptions>
                </form>
            </FormContainer>
        </Container>
    );
};

export default Login;
