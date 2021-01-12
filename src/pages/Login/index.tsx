import React from 'react';
import Input from '../../components/Input'
import Button from '../../components/Button'
import history from '../../services/history';

import { AccountOptions, Container, InputControl, LoginWrapper, ValidatorMessage } from './styles';
import { FiLock, FiMail } from 'react-icons/fi';

const Login = () => {

    const handleLogin = () => {
        history.push("/");
      }

    return (
        <Container>
            <LoginWrapper>
                <h1>Login</h1>
                <InputControl>
                    <Input 
                        type="email" 
                        placeholder="E-mail" 
                        icon={<FiMail/>} 
                    />
                </InputControl>
                <InputControl>
                    <Input 
                        type="password" 
                        placeholder="Senha" 
                        icon={<FiLock/>} 
                    />
                    <ValidatorMessage>
                        <p>A senha informada para este e-mail está incorreta.</p>
                    </ValidatorMessage>
                </InputControl>
                <InputControl>
                    <Button variant="primary" onClick={() => handleLogin()}>Entrar</Button>
                </InputControl>
                <AccountOptions>
                    <p>Esqueci minha senha</p>
                    <p>Ainda nao tem uma conta? Crie uma conta aqui.</p>
                </AccountOptions>
            </LoginWrapper>
        </Container>
    );
};

export default Login;