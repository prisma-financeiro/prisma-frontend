import React, {useState} from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import history from '../../services/history';

import { AccountOptions, Container, FormContainer, InputControl, ValidatorMessage } from './styles';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import Checkbox from '../../components/Checkbox';
import Modal from '../../components/Modal';

const Signup = () => {

    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState<boolean>(false);
    const [isTermsAndConditionsAccepted, setIsTermsAndConditionsAccepted] = useState(false);
    const [isTermsAndConditionsModalVisible, setIsTermsAndConditionsModalVisible] = useState(false);

    const handleSignup = () => {
        history.push("/");
      }

    const handleTermsAndConditionsCheckboxClick = (value: boolean) => {
        setIsTermsAndConditionsAccepted(value)
    }

    const handleTermsAndConditionsLinkClick = () => {
        setIsTermsAndConditionsModalVisible(true)
    }

    const handleTermsAndConditionsModalClosed = () => {
        setIsTermsAndConditionsModalVisible(false)
    }

    const handleTermsAndConditionsModalConfirmed = () => {
        setIsTermsAndConditionsAccepted(true)
        setIsTermsAndConditionsModalVisible(false)
    }

    return (
        <Container>
            <FormContainer>
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
                        <Checkbox onChange={(checked) => handleTermsAndConditionsCheckboxClick(checked)} checked={isTermsAndConditionsAccepted} />
                        Li e aceito os <a onClick={() => handleTermsAndConditionsLinkClick()}><u>Termos e Condições</u></a>
                        <Modal
                            title="Termos e Condições"
                            show={isTermsAndConditionsModalVisible}
                            showButtons={true}
                            primaryButtonText={"Aceito"}
                            secondaryButtonText={"Cancelar"}
                            modalClosed={handleTermsAndConditionsModalClosed}
                            modalConfirmed={handleTermsAndConditionsModalConfirmed}>
                               
                        </Modal>
                    </InputControl>
                    <InputControl>
                        <Button variant="primary" onClick={() => handleSignup()}>Cadastrar</Button>
                    </InputControl>
                    <AccountOptions>
                        <a href="/login">Já tem uma conta? Clique aqui para entrar.</a>
                    </AccountOptions>
                </form>
            </FormContainer>
        </Container>
    );
};

export default Signup;