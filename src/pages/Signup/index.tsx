import React, { useState } from 'react';
import { toast } from "react-toastify";

import { FiMail, FiUser } from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { Creators } from '../../store/ducks/application';

import { HttpResponseError } from '../../exceptions';
import { signUp } from "../../services/signup";

import Input from '../../components/Input';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import Password from '../../components/Password';

import { 
    AccountOptions, 
    Container, 
    FormContainer, 
    InputControl, 
    SpinnerContainer,
    ModalContent,
    IframeContent
} from './styles';

const Signup = () => {
    
    const dispatch = useDispatch();

    const [isSignUpLoading, setIsSignUpLoading] = useState<boolean>(false);
    const [isTermsAndConditionsAccepted, setIsTermsAndConditionsAccepted] = useState<boolean>(false);
    const [isTermsAndConditionsModalVisible, setIsTermsAndConditionsModalVisible] = useState<boolean>(false);
    const [isSignUpSuccessModalVisible, setIsSignUpSuccessModalVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const handleSignUpResponse = () => {
        setIsSignUpLoading(false);
        setIsSignUpSuccessModalVisible(true);
    }

    const handleSignUpError = (error: HttpResponseError) => {
        setIsSignUpLoading(false);
        toast.error(error.message);
    }

    const handleSignupSubmit = () => {
        setIsSignUpLoading(true);
        signUp(name, email, password, isTermsAndConditionsAccepted)
            .then(() => handleSignUpResponse())
            .catch((error: HttpResponseError) => handleSignUpError(error));
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

    const closeSignUpSuccessModelAndRedirectToLogin = () => {
        setIsSignUpSuccessModalVisible(false)
        dispatch(Creators.navigate('/'));
    }

    const handleSignUpSuccessModalClosed = () => {
        closeSignUpSuccessModelAndRedirectToLogin();
    }

    const handleSignUpSuccessModalConfirmed = () => {
        closeSignUpSuccessModelAndRedirectToLogin();
    }

    const handleNameChange = (newName: string) => {
        setName(newName);
    }

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    }

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    }

    const handlePasswordRulesMatched = () => {
        setIsPasswordValid(true);
    }

    const handlePasswordRulesNotMatched = () => {
        setIsPasswordValid(false);
    }

    const isSignUpAllow = (): boolean => {
        return email !== ""
            && isPasswordValid
            && isTermsAndConditionsAccepted;
    }

    return (
        <Container>
            <FormContainer>
                <h1>Cadastre-se</h1>
                <form>
                    <InputControl>
                        <Input 
                            type="text" 
                            placeholder="Nome" 
                            name="nome"
                            icon={<FiUser/>}
                            onChange={(event) => handleNameChange(event.target.value)} 
                        />
                    </InputControl>
                    <InputControl>
                        <Input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            icon={<FiMail />}
                            onChange={(event) => handleEmailChange(event.target.value)}
                        />
                    </InputControl>
                    <InputControl>
                        <Password
                            passwordPlaceholder="Senha"
                            confirmationPlaceholder="Confirme a senha"
                            onChangePassword={(password) => handlePasswordChange(password)}
                            onPasswordRulesMatched={() => handlePasswordRulesMatched()}
                            onPasswordRulesNotMatched={() => handlePasswordRulesNotMatched()}
                        />
                    </InputControl>
                    <InputControl>
                        <Checkbox
                            onChange={(checked) => handleTermsAndConditionsCheckboxClick(checked)}
                            checked={isTermsAndConditionsAccepted}
                        />
                        Li e aceito os <a onClick={() => handleTermsAndConditionsLinkClick()}><u>Termos de Uso e a Política de Privacidade</u></a>
                        <Modal
                            title="Termos de Uso e Política de Privacidade"
                            show={isTermsAndConditionsModalVisible}
                            showButtons={true}
                            primaryButtonText={"Aceito"}
                            secondaryButtonText={"Cancelar"}
                            modalClosed={handleTermsAndConditionsModalClosed}
                            modalConfirmed={handleTermsAndConditionsModalConfirmed}>
                                <ModalContent>
                                    <IframeContent
                                        src="https://docs.google.com/document/d/e/2PACX-1vQMmAMeJbOOnm23xnTnRE9VOohEUog8AZYoZS5e2-YTqMqC_YOViwkr5isXl1cnS--BxJYsit3Qoi5x/pub?embedded=true"
                                    >
                                    </IframeContent>
                                </ModalContent>
                        </Modal>
                    </InputControl>
                    <InputControl>
                        <Button
                            disabled={!isSignUpAllow()}
                            variant="primary"
                            onClick={() => handleSignupSubmit()}
                        >
                            {
                                isSignUpLoading ?
                                    <SpinnerContainer>
                                        <Spinner />
                                    </SpinnerContainer>
                                    : 'Cadastrar'
                            }
                        </Button>
                        <Modal
                            title="Sua conta Prisma foi criada!"
                            show={isSignUpSuccessModalVisible}
                            showButtons={true}
                            primaryButtonText={"OK"}
                            modalClosed={handleSignUpSuccessModalClosed}
                            modalConfirmed={handleSignUpSuccessModalConfirmed}
                        >
                            <p>Confirme sua conta através do link de confirmação que enviamos para seu e-mail.</p>
                        </Modal>
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