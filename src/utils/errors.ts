class APIError extends Error {
    status: number;
    errors: never[]

    constructor(status: number, message: string, errors: never[] = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static OK(message: string) {
        return new APIError(200, message)
    }

    static BadRequests(message: string, error: never[] = []) {
        return new APIError(400, message, error)
    }

    static UnauthorizedError() {
        return new APIError(401, "Пользователь не авторизован")
    }

    static ForbiddenError(message: string) {
        return new APIError(403, message)
    }

    static NotFound(message: string) {
        return new APIError(404, message)
    }

    static ServerError(error: never[] = []) {
        return new APIError(500, "Ошибка сервера", error)
    }
}

export default APIError