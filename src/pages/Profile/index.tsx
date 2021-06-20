import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
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

const Profile: React.FC = () => {


  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const userAccount = localStorageManager.getUserAccount();

  const handleChangePassword = () => {
    login.changePassword(userAccount.email, oldPassword, newPassword)
      .then(() => {
        toast.success("Sua senha foi redefinida.");
      })
      .catch(() => {
        toast.error("Algo deu errado, tente novamente em instantes");
      })
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

  return (
    <Container>
      <h1>Olá {userAccount.name}</h1>
        <Accordion title='Dados Pessoais' size={AccordionSizes.medium}>
          <PersonalInformationBlock>
            <FiUser />
            <p>{userAccount.name}</p>
          </PersonalInformationBlock>
          <PersonalInformationBlock>
            <FiMail />
            <p>{userAccount.email}</p>
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
        <Accordion title='Exclusao de conta' size={AccordionSizes.medium}>
          <AccordionContent>
            <ButtonContainer>
              <Button variant="danger">Excluir minha conta</Button>
            </ButtonContainer>
          </AccordionContent>
        </Accordion>
    </Container>
  );
}

export default Profile;