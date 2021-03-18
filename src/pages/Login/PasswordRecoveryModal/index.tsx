import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Spinner from "../../../components/Spinner";
import { DEFAULT_GENERIC_ERROR_MESSAGE, HttpResponseError } from "../../../exceptions";
import history from "../../../services/history";
import { forgotPassword, ForgotPasswordError } from "../../../services/login";
import sessionStorageManager from "../../../utils/SessionStorageManager";
import { InputControl, SpinnerContainer } from "../styles";
import { ButtonContainer } from "./styles";

interface PasswordRecoveryModalProps {
    onClose: () => void;
    email?: string;
}

const PasswordRecoveryModal: React.FC<PasswordRecoveryModalProps> = ({ onClose, email }) => {

    const [isPasswordRecoveryModalVisible, setIsPasswordRecoveryModalVisible] = useState<boolean>(true);
    const [isLoadingPasswordRecoveryEmailSend, setIsLoadingPasswordRecoveryEmailSend] = useState<boolean>(false);
    const [passwordRecoveryEmail, setPasswordRecoveryEmail] = useState<string>(email ? email : '');

    const getForgotPasswordErrorMessage = (code: string) => {
        switch (code) {
            case ForgotPasswordError.UserNotConfirmedException:
                return "Sua conta não foi confirmada. Confirme-a através do link que enviamos no seu email para poder redefinir sua senha.";

            case ForgotPasswordError.LimitExceededException:
                return "Limite de tentativas excedido, tente novamente mais tarde.";

            default:
                return DEFAULT_GENERIC_ERROR_MESSAGE;
        }
    }

    const handleForgotPasswordError = (error: HttpResponseError) => {
        setIsLoadingPasswordRecoveryEmailSend(false);

        const message = getForgotPasswordErrorMessage(error.code)
        toast.error(message);
    }

    const handlePasswordRocoverySendEmail = () => {
        setIsLoadingPasswordRecoveryEmailSend(true);

        forgotPassword(passwordRecoveryEmail)
            .then(_response => {
                setIsLoadingPasswordRecoveryEmailSend(false);

                sessionStorageManager.setPasswordRecoverEmail(passwordRecoveryEmail);
                history.push("/forgotpassword");
                toast.success("Código de recuperação enviado para seu e-mail.");
            })
            .catch(error => {
                handleForgotPasswordError(error);
            });
    }

    const handlePasswordRecoveryEmailChange = (email: string) => {
        setPasswordRecoveryEmail(email);
    }

    const handlePasswordRecoveryCancelClick = () => {
        setIsPasswordRecoveryModalVisible(false);
        onClose();
    }

    return (
        <Modal
            title="Recuperação de senha"
            show={isPasswordRecoveryModalVisible}
            showButtons={false}
            modalClosed={() => handlePasswordRecoveryCancelClick()}
            modalConfirmed={() => { }}
        >
            <form>
                <InputControl>
                    <label>Digite seu endereço de e-mail</label>
                </InputControl>
                <InputControl>
                    <Input
                        type="email"
                        placeholder="E-mail"
                        icon={<FiMail />}
                        value={passwordRecoveryEmail}
                        required={true}
                        onChange={(event) => handlePasswordRecoveryEmailChange(event.target.value)}
                    />
                </InputControl>
                <ButtonContainer>
                    <Button
                        variant="secondary"
                        onClick={() => handlePasswordRecoveryCancelClick()}>
                        Cancelar
                            </Button>
                    <Button
                        variant="primary"
                        disabled={!passwordRecoveryEmail}
                        onClick={() => handlePasswordRocoverySendEmail()}>
                        {
                            isLoadingPasswordRecoveryEmailSend ?
                                <SpinnerContainer>
                                    <Spinner />
                                </SpinnerContainer>
                                : 'Enviar e-mail'
                        }
                    </Button>
                </ButtonContainer>
            </form>
        </Modal>
    )

}

export default PasswordRecoveryModal;