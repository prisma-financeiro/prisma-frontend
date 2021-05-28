import { HttpResponseError } from "../exceptions";
import api, { HttpStatusCode } from "./api"

export const SignUpExceptions = {
    UsernameExistsException: 'UsernameExistsException',
    InvalidPasswordException: 'InvalidPasswordException',
    InvalidParameterException: 'InvalidParameterException',
}

export const signUp = async (name: string, email: string, password: string, termsAndConditionsAccepted: boolean): Promise<any> => {
    return api
        .post('api/v1/signup', {
            name,
            email,
            password,
            termsAndConditionsAccepted
        })
        .then(response => {
            if (response.status === HttpStatusCode.Success) {
                return response.data
            }
        })
        .catch(error => {
            const response = error.response;

            if (response.data.code === SignUpExceptions.UsernameExistsException) {
                throw new HttpResponseError({ ...response.data, message: 'Já existe uma conta para o e-mail informado.' });
            } else {
                throw new HttpResponseError({ ...response.data, message: 'Não foi possível criar sua conta.' });
            }
        });
}

export const resendConfirmation = async (email: string): Promise<any> => {
    return api
        .post('api/v1/resendconfirmation', {
            email,
        })
        .then(response => response.data)
        .catch(error => error);
}