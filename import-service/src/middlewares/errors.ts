export class ValidationError {
    statusCode: number;
    message: string;
    constructor(message: string) {
        this.statusCode = 400;
        this.message = `Validation error: ${message}`;
    }
}

export const errorsHandler = () => ({
    onError: async (request) => {
        if(request.error instanceof ValidationError) {
            request.response = {
                statusCode: request.error.statusCode,
                body: JSON.stringify({
                    message: request.error.message
                }),
            }
        }
        else {
            console.log("ERROR:", request.error)
            request.response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Internal server error"
                })
            };
        }
    }
})