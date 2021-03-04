import React, { useState } from 'react';
import Input from '../../components/Input'
import Button from '../../components/Button'
import history from '../../services/history';

import { AccountOptions, ConfirmationModalButtonContainer, Container, FormContainer, InputControl, SpinnerContainer } from './styles';
import { FiKey, FiLock } from 'react-icons/fi';
import * as login from "../../services/login";
import * as signUp from "../../services/signup";
import withErrorHandler from '../../hocs/withErrorHandler';
import api from "../../services/api";
import useAuth from '../../contexts/auth';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';
import { toast } from "react-toastify";

const KEY_ENTER = "Enter";

const ForgotPassword = () => {

    const [isLoadingSendRecoverEmail, setIsLoadingSendRecoverEmail] = useState<boolean>(false);
    const [isPasswordRecoverEmailSended, setIsPasswordRecoverEmailSended] = useState<boolean>(false);
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
                toast.error("Não foi possível acessar sua conta. Tente mais tarde.");
                break;
        }
    }

    const handleLogin = () => {
        if (email && password) {
            setIsLoadingSendRecoverEmail(true);

            login.signIn(email, password)
                .then(response => {
                    setIsLoadingSendRecoverEmail(false);
                    if (response.auth) {
                        signIn(response);
                        history.push("/home");
                    } else {
                        showLoginErrorMessage(response.code);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setIsLoadingSendRecoverEmail(false);
                });
        }
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

    return (
        <Container>
            <FormContainer>
                <h1>Definir sua nova senha</h1>
                <form>
                    <InputControl>
                        <Input
                            type="input"
                            placeholder="Código de recuperação"
                            icon={<FiKey />}
                            value={email}
                            required={true}
                            onChange={(event) => handleEmailChange(event.target.value)}
                        />
                    </InputControl>
                    <InputControl>
                        <Input
                            type="password"
                            placeholder="Nova senha"
                            icon={<FiLock />}
                            value={password}
                            required={true}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handlePasswordKeyDown(event)}
                        />
                    </InputControl>
                    <InputControl>
                        <Input
                            type="password"
                            placeholder="Confirmação da nova senha"
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
                            disabled={!email || !password || isLoadingSendRecoverEmail}
                        >
                            {
                                isLoadingSendRecoverEmail ?
                                    <SpinnerContainer>
                                        <Spinner />
                                    </SpinnerContainer>
                                    : 'Redefinir'
                            }
                        </Button>
                    </InputControl>
                </form>
                <AccountOptions>
                    <a href='/login'>Entrar na sua conta.</a>
                </AccountOptions>
            </FormContainer>
        </Container>
    );
};

export default withErrorHandler(ForgotPassword, api);