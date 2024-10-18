class APIError extends Error {
    status: number;
    errors: any[]

    constructor(status: number, message: string, errors: any[] = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static OK(message: string) {
        return new APIError(200, message)
    }

    static BadRequests(message: string, error: any[] = []) {
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

    static ServerError(error: any[] = []) {
        return new APIError(500, "Ошибка сервера", error)
    }
}

export default APIError