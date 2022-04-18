import api from '../auth/api'

interface Response {
    message?: string;
    statusCode?: number;
    token: string;
    user: {
        name: string;
        email: string;
    }
}

/* interface ResponseUser {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

interface ResponseError {
    message: string;
    statusCode: number; 
} */

export async function signIn (email:string, password:string):Promise<Response> {
    
    const result = await api.post("/Auth", {email, password })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data
    });

    return result

}


