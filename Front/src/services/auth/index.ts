import api from '../auth/api'
import axios from "axios";

interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export async function signIn ():Promise<Response> {
    
    const email = "vini@email.com"
    const password = "123"

    const result = await api.post("/Auth", {email, password })
    .then((response) => {
        return response.data
    })
    .catch((error) => console.log(error.message));

    return result

}


