const addCorsToRequest = async (request) => {
    if(request.response) {
        request.response.headers = {
            ...request.response.headers,
            "Access-Control-Allow-Origin": "*"
        }
    }
}

export const corsMiddleware = () => ({
    after: addCorsToRequest,
    onError: addCorsToRequest
});
