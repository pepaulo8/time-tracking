import api from './api'

interface Response {
    message: string;
    statusCode?: number;
}

// ok -> User registered successfully


export async function signUp(name: string, email: string, password: string) {
    const result = await api.post("/users", {name, email, password })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data
    });

    return result
}
