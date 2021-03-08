export const DEFAULT_GENERIC_ERROR_MESSAGE = "Ops, algo deu errado, tente novamente.";

export class ConnectionRefusedError extends Error {
    constructor() {
        super();
        this.message = "Ops, algo deu errado, tente novamente em instântes.";
    }
};