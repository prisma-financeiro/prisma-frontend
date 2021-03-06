import React, { useState } from "react";
import { FiLock } from "react-icons/fi";
import Input from "../Input";
import { PasswordRule } from "./PasswordRule";
import { Container, ValidatorMessage } from "./styles";

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

const CONTAIN_LOWERCASE_LETTER_REGEXP = "(?=.*[a-z])";
const CONTAIN_UPPERCASE_LETTER_REGEXP = "(?=.*[A-Z])";
const CONTAIN_NUMBER_REGEXP = "(?=.*[0-9])";
const CONTAIN_SPECIAL_CHARACTER_REGEXP = "(?=.[!@#$%^&])";
const CONTAIN_AT_LEAST_EIGHT_CHARACHTERS_REGEXP = "(?=.{8,})";

interface PasswordProps {
    passwordPlaceholder: string,
    confirmationPlaceholder: string,
    onChangePassword: (password: string) => void;
    onPasswordRulesMatched: () => void;
    onPasswordRulesNotMatched: () => void;
}

const Password: React.FC<PasswordProps> = ({ passwordPlaceholder, confirmationPlaceholder, onChangePassword, onPasswordRulesMatched, onPasswordRulesNotMatched }) => {

    const [isPasswordRulesVisible, setIsPasswordRulesVisible] = useState<boolean>(false);
    const [password, setPassword] = useState<SignUpInput<string>>({} as SignUpInput<string>);
    const [passwordConfirmation, setPasswordConfirmation] = useState<SignUpInput<string>>({} as SignUpInput<string>);
    const [passwordRules, setPasswordRules] = useState<PasswordRules>({} as PasswordRules);

    const getPasswordRulesVerified = (password: string): PasswordRules => {
        return {
            containLowerCaseLetter: new RegExp(CONTAIN_LOWERCASE_LETTER_REGEXP).test(password),
            containUpperCaseLetter: new RegExp(CONTAIN_UPPERCASE_LETTER_REGEXP).test(password),
            containSpecialCharacter: new RegExp(CONTAIN_SPECIAL_CHARACTER_REGEXP).test(password),
            containNumber: new RegExp(CONTAIN_NUMBER_REGEXP).test(password),
            containAtLeastEightCharacters: new RegExp(CONTAIN_AT_LEAST_EIGHT_CHARACHTERS_REGEXP).test(password),
        }
    }

    const handlePasswordChange = (newPassword: string) => {
        const passwordRulesVerified = getPasswordRulesVerified(newPassword);
        setPasswordRules(passwordRulesVerified);

        const areAllPasswordRulesMatched = checkPasswordRulesMatch(passwordRulesVerified);
        setPassword({
            value: newPassword,
            valid: areAllPasswordRulesMatched
        });

        onChangePassword(newPassword);

        passwordConfirmation.valid && areAllPasswordRulesMatched ? onPasswordRulesMatched() : onPasswordRulesNotMatched();

    }

    const handlePasswordConfirmationChange = (newPassword: string) => {
        const isNewConfirmationPasswordValid = (newPassword && newPassword === password.value) as boolean;
        setPasswordConfirmation({
            value: newPassword,
            valid: isNewConfirmationPasswordValid
        });

        password.valid && isNewConfirmationPasswordValid ? onPasswordRulesMatched() : onPasswordRulesNotMatched();
    }

    const checkPasswordRulesMatch = (passwordRules: PasswordRules): boolean => {
        return passwordRules.containAtLeastEightCharacters
            && passwordRules.containLowerCaseLetter
            && passwordRules.containNumber
            && passwordRules.containSpecialCharacter
            && passwordRules.containUpperCaseLetter
    }

    const handlePasswordInputFocus = () => {
        setIsPasswordRulesVisible(true);
    }

    const handlePasswordInputBlur = () => {
        if (checkPasswordRulesMatch(passwordRules)) {
            setIsPasswordRulesVisible(false);
        }
    }

    return (
        <Container>
            <Input
                type="password"
                placeholder={passwordPlaceholder}
                name="senha"
                icon={<FiLock />}
                onChange={(event) => handlePasswordChange(event.target.value)}
                onBlur={() => handlePasswordInputBlur()}
                onFocus={() => handlePasswordInputFocus()}
            />
            {
                isPasswordRulesVisible ?
                    <>
                        <PasswordRule
                            text='Senha precisa conter uma letra min??scula.'
                            match={passwordRules.containLowerCaseLetter}
                        />
                        <PasswordRule
                            text='Senha precisa conter uma letra mai??scula.'
                            match={passwordRules.containUpperCaseLetter}
                        />
                        <PasswordRule
                            text='Senha precisa conter um caracter especial.'
                            match={passwordRules.containSpecialCharacter}
                        />
                        <PasswordRule
                            text='Senha precisa conter um n??mero.'
                            match={passwordRules.containNumber}
                        />
                        <PasswordRule
                            text='Senha precisa conter no m??nimo 8 d??gitos.'
                            match={passwordRules.containAtLeastEightCharacters}
                        />
                    </>
                    :
                    null
            }
            <Input
                type="password"
                placeholder={confirmationPlaceholder}
                name="confirmacaoSenha"
                icon={<FiLock />}
                onChange={(event) => handlePasswordConfirmationChange(event.target.value)}
            />
            {
                passwordConfirmation.value && !passwordConfirmation.valid ?
                    <ValidatorMessage>
                        <p>A senha e a confirma????o de senha devem ser iguais.</p>
                    </ValidatorMessage>
                    :
                    null
            }
        </Container>
    )
}

export default Password;