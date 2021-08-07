import { ValidationError } from './errors';

export type ValidationRule = {
    type: "pathParameters" | "body" | "queryStringParameters",
    errorMessage: string,
    parameter: string,
    validationFunction: (value: any) => boolean;
}

export const validationMiddleware = (validationRules: ValidationRule[]) => ({
    before: async request => {
        for(let validationRule of validationRules) {
            const {type, parameter, validationFunction, errorMessage} = validationRule;
            console.log('validationMiddleware 1',[!request.event || !request.event[type], type]);
            if(!request.event || !request.event[type]) {
                throw new ValidationError("incorrect event signature");
            }

            console.log('validationMiddleware 2',[!validationFunction(request.event[type][parameter]), type, parameter]);
            if(!validationFunction(request.event[type][parameter])) {
                throw new ValidationError(errorMessage);
            }
        }
    }
});
