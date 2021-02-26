import api from "./api"

export const SignInExceptions = {
    UserNotConfirmedException: 'UserNotConfirmedException',
    NotAuthorizedException: 'NotAuthorizedException'
}

export const signIn = async (email: string, password: string): Promise<any> => {
    return api
        .post('api/v1/signin', {
            email,
            password
        })
        .then(response => response.data)
        .catch(error => error);
}


export const signOut = async (): Promise<any> => {
    return api
        .post('api/v1/signout')
        .then(response => response.data)
        .catch(error => error);
}