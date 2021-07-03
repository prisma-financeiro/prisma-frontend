import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Password from '../../components/Password';
import localStorageManager from '../../utils/LocalStorageManager';
import { toast } from "react-toastify";
import * as login from "../../services/login";

import { FiUser, FiMail, FiLock } from 'react-icons/fi';

import { 
  Container, 
  ButtonContainer, 
  PersonalInformationBlock, 
  PasswordContainer,
  AccordionContent } from './styles';
import Accordion, { AccordionSizes } from '../../components/Accordion';
import { UserAccount } from '../../models';

const Profile: React.FC = () => {

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [userAccount, setUserAccount] = useState<UserAccount>();

  useEffect(()=> {
    setUserAccount(localStorageManager.getUserAccount())
  }, []);

  const handleChangePassword = () => {
    if (userAccount) {
      login.changePassword(userAccount.email, oldPassword, newPassword)
      .then(() => {
        toast.success("Sua senha foi redefinida");
      })
      .catch(() => {
        toast.error("Algo deu errado, tente novamente em instantes");
      })
    }
  }

  const handlePasswordChange = (password: string) => {
    setNewPassword(password);
  }

  const handlePasswordRulesMatched = () => {
    setIsPasswordValid(true);
  }

  const handlePasswordRulesNotMatched = () => {
      setIsPasswordValid(false);
  }

  const handleSetOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  }

  const handleAccountDeletion = () => {
    login.deleteUserAccount()
      .then(userAccount => {
        localStorageManager.setUserAccount(userAccount);
        setUserAccount(userAccount);
        toast.success("Sua conta foi marcada para exclusão e será excluída em 30 dias");
        setIsConfirmationModalOpen(false);
      })
      .catch(() => {
        toast.error("Algo deu errado, tente novamente em instantes");
        setIsConfirmationModalOpen(false);
      })
  }

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  }

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  }

  return (
    <Container>
      <h1>Olá, {userAccount?.name}</h1>
        <Accordion title='Dados Pessoais' size={AccordionSizes.medium}>
          <PersonalInformationBlock>
            <FiUser />
            <p>{userAccount?.name}</p>
          </PersonalInformationBlock>
          <PersonalInformationBlock>
            <FiMail />
            <p>{userAccount?.email}</p>
          </PersonalInformationBlock>
        </Accordion>
        <Accordion title='Mudança de senha' size={AccordionSizes.medium}>
          <AccordionContent>
            <PasswordContainer>
              <Input 
                type="password" 
                placeholder="Senha atual" 
                onChange={handleSetOldPassword}
                icon={<FiLock />}/>
              <Password
                  passwordPlaceholder="Nova senha"
                  confirmationPlaceholder="Confirme a nova senha"
                  onChangePassword={(password) => handlePasswordChange(password)}
                  onPasswordRulesMatched={() => handlePasswordRulesMatched()}
                  onPasswordRulesNotMatched={() => handlePasswordRulesNotMatched()}
              />
            </PasswordContainer>
            <ButtonContainer>
              <Button variant="primary" onClick={handleChangePassword} disabled={!isPasswordValid}>Alterar senha</Button>
            </ButtonContainer>
          </AccordionContent>
        </Accordion>
        <Accordion title='Exclusão de conta' size={AccordionSizes.medium}>
          <AccordionContent>
            {userAccount?.accountStatus === '3' ? 
              <p>Sua conta será excluída em 30 dias.</p>
              : 
              <ButtonContainer>
                <Button variant="danger" onClick={openConfirmationModal}>Excluir minha conta</Button>
              </ButtonContainer>
            }
          </AccordionContent>
        </Accordion>
        <Modal
        title="Exclusão de Conta"
        show={isConfirmationModalOpen}
        showButtons={true}
        primaryButtonText="Excluir minha conta"
        secondaryButtonText="Voltar"
        modalClosed={closeConfirmationModal}
        modalConfirmed={handleAccountDeletion}>
          <p>Você tem certeza que deseja excluir a sua conta?</p>
      </Modal>
    </Container>
  );
}

export default Profile;