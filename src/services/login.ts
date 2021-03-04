import { Session } from "../models";
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

export const forgotPassword = async (email: string): Promise<any> => {
    return api
        .post('api/v1/forgotpassword', {
            email
        })
        .then(response => {
            console.log("response forgotpass");
            return response.data
        });
}

export const refreshToken = async (): Promise<Session> => {
    return api
        .get('api/v1/refreshtoken')
        .then(response => response.data);
}