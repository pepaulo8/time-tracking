import api from '../auth/api'
import axios from "axios";

export async function signIn () {
    
    const email = "vini@email.com"
    const password = "123"

    const result = await api.post("/Auth", {email, password })
    .then((response) => {
        console.log("response.data",response.data)
        return response.data
    })
    .catch((error) => console.log(error.message));

    return result

}


