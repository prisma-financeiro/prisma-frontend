import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import history from '../../services/history';

import { AccountOptions, Container, FormContainer, InputControl, SpinnerContainer, ValidatorMessage } from './styles';
import { FiLock, FiMail } from 'react-icons/fi';
import Checkbox from '../../components/Checkbox';
import Modal from '../../components/Modal';
import { PasswordRule } from './PasswordRule';

import { signUp } from "../../services/signup";
import Spinner from '../../components/Spinner';
import { toast } from "react-toastify";
import { HttpResponseError } from '../../services/api';

const CONTAIN_LOWERCASE_LETTER_REGEXP = "(?=.*[a-z])";
const CONTAIN_UPPERCASE_LETTER_REGEXP = "(?=.*[A-Z])";
const CONTAIN_NUMBER_REGEXP = "(?=.*[0-9])";
const CONTAIN_SPECIAL_CHARACTER_REGEXP = "(?=.[!@#$%^&])";
const CONTAIN_AT_LEAST_EIGHT_CHARACHTERS_REGEXP = "(?=.{8,})";

interface PasswordRules {
    containLowerCaseLetter: boolean;
    containUpperCaseLetter: boolean;
    containSpecialCharacter: boolean;
    containNumber: boolean;
    containAtLeastEightCharacters: boolean;
}

interface SignUpInput<T> {
    value: T;
    valid: boolean;
}

const Signup = () => {

    const [isSignUpLoading, setIsSignUpLoading] = useState<boolean>(false);
    const [isTermsAndConditionsAccepted, setIsTermsAndConditionsAccepted] = useState<boolean>(false);
    const [isTermsAndConditionsModalVisible, setIsTermsAndConditionsModalVisible] = useState<boolean>(false);
    const [isSignUpSuccessModalVisible, setIsSignUpSuccessModalVisible] = useState<boolean>(false);
    const [isPasswordRulesVisible, setIsPasswordRulesVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<SignUpInput<string>>({} as SignUpInput<string>);
    const [passwordConfirmation, setPasswordConfirmation] = useState<SignUpInput<string>>({} as SignUpInput<string>);
    const [passwordRules, setPasswordRules] = useState<PasswordRules>({} as PasswordRules);

    const handleSignup = () => {
        setIsSignUpLoading(true);
        signUp(email, password.value)
            .then(_response => {
                setIsSignUpLoading(false);
                setIsSignUpSuccessModalVisible(true);
            })
            .catch((error: HttpResponseError) => {
                setIsSignUpLoading(false);
                toast.error(error.message);
            });
    }

    const getPasswordRulesVerified = (password: string): PasswordRules => {
        return {
            containLowerCaseLetter: new RegExp(CONTAIN_LOWERCASE_LETTER_REGEXP).test(password),
            containUpperCaseLetter: new RegExp(CONTAIN_UPPERCASE_LETTER_REGEXP).test(password),
            containSpecialCharacter: new RegExp(CONTAIN_SPECIAL_CHARACTER_REGEXP).test(password),
            containNumber: new RegExp(CONTAIN_NUMBER_REGEXP).test(password),
            containAtLeastEightCharacters: new RegExp(CONTAIN_AT_LEAST_EIGHT_CHARACHTERS_REGEXP).test(password),
        }
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

    const handleSignUpSuccessModalClosed = () => {
        setIsSignUpSuccessModalVisible(false)
        history.push("/");
    }

    const handleSignUpSuccessModalConfirmed = () => {
        setIsSignUpSuccessModalVisible(false);
        history.push("/");
    }

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    }

    const handlePasswordInputFocus = () => {
        setIsPasswordRulesVisible(true);
    }

    const handlePasswordInputBlur = () => {
        if (checkPasswordRulesMatch(passwordRules)) {
            setIsPasswordRulesVisible(false);
        }
    }

    const handlePasswordChange = (newPassword: string) => {
        const passwordRulesVerified = getPasswordRulesVerified(newPassword);
        setPasswordRules(passwordRulesVerified);

        const allRulesValid = checkPasswordRulesMatch(passwordRulesVerified);
        setPassword({
            value: newPassword,
            valid: allRulesValid
        });
    }

    const handlePasswordConfirmationChange = (newPassword: string) => {
        setPasswordConfirmation({
            value: newPassword,
            valid: (newPassword && newPassword === password.value) as boolean
        });
    }

    const checkPasswordRulesMatch = (passwordRules: PasswordRules): boolean => {
        return passwordRules.containAtLeastEightCharacters
            && passwordRules.containLowerCaseLetter
            && passwordRules.containNumber
            && passwordRules.containSpecialCharacter
            && passwordRules.containUpperCaseLetter
    }

    const isSignUpAllow = (): boolean => {
        return email !== ""
            && password.valid
            && passwordConfirmation.valid
            && isTermsAndConditionsAccepted;
    }

    return (
        <Container>
            <FormContainer>
                <h1>Cadastre-se</h1>
                <form>
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
                        <Input
                            type="password"
                            placeholder="Senha"
                            name="senha"
                            icon={<FiLock />}
                            onChange={(event) => handlePasswordChange(event.target.value)}
                            onBlur={() => handlePasswordInputBlur()}
                            onFocus={() => handlePasswordInputFocus()}
                        />
                    </InputControl>
                    {
                        isPasswordRulesVisible ?
                            <InputControl>
                                <PasswordRule
                                    text='Senha precisa conter uma letra minúscula.'
                                    match={passwordRules.containLowerCaseLetter}
                                />
                                <PasswordRule
                                    text='Senha precisa conter uma letra maiúscula.'
                                    match={passwordRules.containUpperCaseLetter}
                                />
                                <PasswordRule
                                    text='Senha precisa conter um catactere especial.'
                                    match={passwordRules.containSpecialCharacter}
                                />
                                <PasswordRule
                                    text='Senha precisa conter um número.'
                                    match={passwordRules.containNumber}
                                />
                                <PasswordRule
                                    text='Senha precisa conter no mínimo 8 dígitos.'
                                    match={passwordRules.containAtLeastEightCharacters}
                                />
                            </InputControl>
                            :
                            null

                    }
                    <InputControl>
                        <Input
                            type="password"
                            placeholder="Confirmação de senha"
                            name="confirmacaoSenha"
                            icon={<FiLock />}
                            onChange={(event) => handlePasswordConfirmationChange(event.target.value)}
                        />
                        {
                            passwordConfirmation.value && !passwordConfirmation.valid ?
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
                        <Button disabled={!isSignUpAllow()} variant="primary" onClick={() => handleSignup()}>
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