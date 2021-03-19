export const DEFAULT_GENERIC_ERROR_MESSAGE = "Ops, algo deu errado, tente novamente.";

export class ConnectionRefusedError extends Error {
    constructor() {
        super();
        this.message = "Ops, algo deu errado, tente novamente em instântes.";
    }
};

export class TokenRefreshError extends Error {
    constructor() {
        super();
        this.message = "Não foi possível atualizar a sessão.";
    }
};

export class HttpResponseError extends Error {
    private _status: number;
    private _code: string;

    constructor({ status, code, message }: any) {
        super();
        this._status = status;
        this.message = message;
        this._code = code;
    }

    public get status(): number {
        return this._status;
    }

    public get code(): string {
        return this._code;
    }
}