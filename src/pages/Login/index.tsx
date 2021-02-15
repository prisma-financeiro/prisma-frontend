import React, { useState } from 'react';
import Input from '../../components/Input'
import Button from '../../components/Button'
import history from '../../services/history';

import { AccountOptions, Container, FormContainer, InputControl, ValidatorMessage } from './styles';
import { FiLock, FiMail } from 'react-icons/fi';
import * as login from "../../services/login";
import withErrorHandler from '../../hocs/withErrorHandler';
import api from "../../services/api";
import useAuth from '../../contexts/auth';

const Login = () => {

    const [isLoadingSignIn, setIsLoadingSignIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('pk.koglin@gmail.com');
    const [password, setPassword] = useState<string>('Pr1s@2021');

    const { signed, signIn } = useAuth();

    if (signed) {
        history.push("/home");
    }

    const showLoginErrorMessage = (code: string) => {
        switch (code) {
            case login.SignInExceptions.NotAuthorizedException:
                setErrorMessage("E-mail ou senha inválidos.")
                break;

            case login.SignInExceptions.UserNotConfirmedException:
                setErrorMessage("Confirme sua conta para entrar.")
                break;

            default:
                setErrorMessage("Não foi possível acessar sua conta. Tente mais tarde.")
                break;
        }
    }

    const handleLogin = () => {
        if (email && password) {
            setIsLoadingSignIn(true);

            login.signIn(email, password)
                .then(response => {
                    setIsLoadingSignIn(false);
                    if (response.auth) {
                        signIn(response);
                        history.push("/home");
                    } else {
                        showLoginErrorMessage(response.code);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setIsLoadingSignIn(false);
                });
        }
    }

    const handleEmailChange = (email: string) => {
        setEmail(email);
    }

    return (
        <Container>
            <FormContainer>
                <h1>Faça seu login</h1>
                <form>
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
                        />
                        {
                            errorMessage ?
                                <ValidatorMessage>
                                    <p>{errorMessage}</p>
                                </ValidatorMessage>
                                :
                                null
                        }
                    </InputControl>
                    <InputControl>
                        <Button
                            variant="primary"
                            onClick={() => handleLogin()}
                            disabled={!email || !password || isLoadingSignIn}
                        >Entrar
                            </Button>
                    </InputControl>
                    <AccountOptions>
                        <a href='/home'>Esqueci minha senha</a>
                        <a href='/signup'>Ainda não tem uma conta? Crie uma conta aqui.</a>
                    </AccountOptions>
                </form>
            </FormContainer>
        </Container>
    );
};

export default withErrorHandler(Login, api);