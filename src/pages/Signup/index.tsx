import React, {useState} from 'react';
import Input from '../../components/Input'
import Button from '../../components/Button'
import history from '../../services/history';

import { AccountOptions, Container, InputControl, ValidatorMessage } from './styles';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';

const Signup = () => {

    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState<boolean>(false);

    const handleSignup = () => {
        history.push("/");
      }

    return (
        <Container>
            <form>
            <InputControl>
                    <Input 
                        type="text" 
                        placeholder="Nome" 
                        name="nome"
                        icon={<FiUser/>} 
                    />
                </InputControl>
                <InputControl>
                    <Input 
                        type="email" 
                        placeholder="E-mail" 
                        name="email"
                        icon={<FiMail/>} 
                    />
                </InputControl>
                <InputControl>
                    <Input 
                        type="password" 
                        placeholder="Senha" 
                        name="senha"
                        icon={<FiLock/>} 
                    />
                </InputControl>
                <InputControl>
                    <Input 
                        type="password" 
                        placeholder="Confirmação de senha" 
                        name="confirmacaoSenha"
                        icon={<FiLock/>} 
                    />
                    {
                        isErrorMessageVisible?
                            <ValidatorMessage>
                                <p>A senha e a confirmação de senha devem ser iguais.</p>
                            </ValidatorMessage>
                        :
                            null
                    }
                </InputControl>
                <InputControl>
                    <div>
                        <input type="checkbox" name="termosCondicoes"/> Li e aceito os <a>Termos e Condições</a>
                    </div>
                </InputControl>
                <InputControl>
                    <Button variant="primary" onClick={() => handleSignup()}>Cadastrar</Button>
                </InputControl>
                <AccountOptions>
                    <a href="/login">Já tem uma conta? Clique aqui para entrar.</a>
                </AccountOptions>
            </form>
        </Container>
    );
};

export default Signup;