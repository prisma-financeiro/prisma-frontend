import { Session } from "../models";
import api from "./api"

export enum SignInExceptions {
    UserNotConfirmedException = 'UserNotConfirmedException',
    NotAuthorizedException = 'NotAuthorizedException'
}

export const signIn = async (email: string, password: string): Promise<any> => {
    return api
        .post('api/v1/signin', {
            email,
            password
        })
        .then(response => response.data);
}


export const signOut = async (): Promise<any> => {
    return api
        .post('api/v1/signout')
        .then(response => response.data)
        .catch(error => error);
}


export enum ForgotPasswordError {
    LimitExceededException = 'LimitExceededException',
    UserNotConfirmedException = 'UserNotConfirmedException',
}

export const forgotPassword = async (email: string): Promise<any> => {
    return api
        .post('api/v1/forgotpassword', {
            email
        })
        .then(response => response.data);
}

export enum ForgotPasswordSubmitError {
    InvalidPasswordException = 'InvalidPasswordException',
    InvalidParameterException = 'InvalidParameterException',
    CodeMismatchException = 'CodeMismatchException',
    LimitExceededException = 'LimitExceededException',
    ExpiredCodeException = 'ExpiredCodeException',
}

export const forgotPasswordSubmit = async (email: string, code: string, password: string): Promise<any> => {
    return api
        .post('api/v1/forgotpasswordsubmit', {
            email,
            code,
            password
        })
        .then(response => response.data);
}

export const refreshToken = async (): Promise<Session> => {
    return api
        .get('api/v1/refreshtoken')
        .then(response => response.data);
}