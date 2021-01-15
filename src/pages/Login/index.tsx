import React, {useState} from 'react';
import Input from '../../components/Input'
import Button from '../../components/Button'
import history from '../../services/history';

import { AccountOptions, Container, InputControl, ValidatorMessage } from './styles';
import { FiLock, FiMail } from 'react-icons/fi';

const Login = () => {

    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState<boolean>(false);

    const handleLogin = () => {
        history.push("/");
      }

    return (
        <Container>
            <form>
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
                    {
                        isErrorMessageVisible?
                            <ValidatorMessage>
                                <p>A senha informada para este e-mail está incorreta.</p>
                            </ValidatorMessage>
                        :
                            null
                    }
                </InputControl>
                <InputControl>
                    <Button variant="primary" onClick={() => handleLogin()}>Entrar</Button>
                </InputControl>
                <AccountOptions>
                    <p>Esqueci minha senha</p>
                    <p>Ainda nao tem uma conta? Crie uma conta aqui.</p>
                </AccountOptions>
            </form>
        </Container>
    );
};

export default Login;