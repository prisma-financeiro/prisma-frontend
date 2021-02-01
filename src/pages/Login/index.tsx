import React, {useState} from 'react';
import Input from '../../components/Input'
import Button from '../../components/Button'
import history from '../../services/history';

import { AccountOptions, Container, FormContainer, InputControl, ValidatorMessage } from './styles';
import { FiLock, FiMail } from 'react-icons/fi';
import useAuth from '../../contexts/auth';

const Login = () => {

    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState<boolean>(false);
    const { signIn } = useAuth();

    const handleLogin = () => {
        signIn('random');
        history.push("/home");
      }

    return (
        <Container>
            <FormContainer>
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
            </FormContainer>
        </Container>
    );
};

export default Login;