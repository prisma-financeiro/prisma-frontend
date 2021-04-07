import React, { useState } from 'react';
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Creators } from '../../store/ducks/application';
import { useDispatch } from 'react-redux';

import { Container, FormContainer, InputControl, SpinnerContainer } from './styles';
import { FiKey } from 'react-icons/fi';
import * as login from "../../services/login";
import Spinner from '../../components/Spinner';
import { toast } from "react-toastify";
import Password from '../../components/Password';
import sessionStorageManager from '../../utils/SessionStorageManager';
import { DEFAULT_GENERIC_ERROR_MESSAGE, HttpResponseError } from '../../exceptions';

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const [isLoadingPasswordRecover, setIsLoadingPasswordRecover] = useState<boolean>(false);
    const [confirmationCode, setConfirmationCode] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState<boolean>(false);

    const handleConfirmationCodeChange = (value: string): void => {
        setConfirmationCode(value);
    }
    const handleOnChangePassword = (password: string): void => {
        setPassword(password);
    }

    const handlePasswordRulesMatched = () => {
        setPasswordValid(true);
    }

    const handlePasswordRulesNotMatched = () => {
        setPasswordValid(false);
    }

    const redirectToLoginPage = () => {
        dispatch(Creators.navigate('/'));
    }

    const showSuccessMessageAndRedirectToLoginPage = () => {
        redirectToLoginPage();
        toast.success("Sua senha foi redefinida.");
    }

    const removeSessionStorageEmail = () => {
        sessionStorageManager.removePasswordRecoverEmail();
    }

    const handleForgotPasswordSubmitResponse = () => {
        setIsLoadingPasswordRecover(false);
        removeSessionStorageEmail();
        showSuccessMessageAndRedirectToLoginPage();
    }

    const getForgotPasswordSubmitErrorMessage = (code: string): string => {
        switch (code) {
            case login.ForgotPasswordSubmitError.CodeMismatchException:
                return "Código de verificação inválido, tente novamente.";

            case login.ForgotPasswordSubmitError.ExpiredCodeException:
                return "Código de verificação inválido, solicite um novo código.";

            default:
                return DEFAULT_GENERIC_ERROR_MESSAGE;
        }
    }

    const handleForgotPasswordSubmitError = (error: HttpResponseError) => {
        setIsLoadingPasswordRecover(false);
        const message = getForgotPasswordSubmitErrorMessage(error.code);
        toast.error(message);
    }

    const handlePasswordRecoverSubmit = () => {
        setIsLoadingPasswordRecover(true);

        const email = sessionStorageManager.getPasswordRecoverEmail();
        login.forgotPasswordSubmit(email, confirmationCode, password)
            .then(() => handleForgotPasswordSubmitResponse())
            .catch((error: HttpResponseError) => handleForgotPasswordSubmitError(error));
    }

    const handleForgotPasswordCancel = (): void => {
        redirectToLoginPage();
    }

    const isSubmitAllowed = (): boolean => {
        return !!confirmationCode && passwordValid;
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
                            value={confirmationCode}
                            required={true}
                            onChange={(event) => handleConfirmationCodeChange(event.target.value)}
                        />
                    </InputControl>
                    <Password
                        onChangePassword={(password) => handleOnChangePassword(password)}
                        onPasswordRulesMatched={() => handlePasswordRulesMatched()}
                        onPasswordRulesNotMatched={() => handlePasswordRulesNotMatched()}
                    />
                    <InputControl>
                        <Button
                            variant="primary"
                            onClick={() => handlePasswordRecoverSubmit()}
                            disabled={!isSubmitAllowed()}
                        >
                            {
                                isLoadingPasswordRecover ?
                                    <SpinnerContainer>
                                        <Spinner />
                                    </SpinnerContainer>
                                    : 'Redefinir'
                            }
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => handleForgotPasswordCancel()}
                        >
                            Cancelar
                        </Button>
                    </InputControl>
                </form>
            </FormContainer>
        </Container>
    );
};

export default ForgotPassword;