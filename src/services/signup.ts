import api, { HttpResponseError, HttpStatusCode } from "./api"

export const SignUpExceptions = {
    UsernameExistsException: 'UsernameExistsException',
    InvalidPasswordException: 'InvalidPasswordException',
    InvalidParameterException: 'InvalidParameterException',
}

export const signUp = async (email: string, password: string): Promise<any> => {
    return api
        .post('api/v1/signup', {
            email,
            password
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