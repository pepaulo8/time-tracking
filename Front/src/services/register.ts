import api from './api'

export async function postRegister(token: string | null) {
    const result = await api.post("/registers", { token })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data
    });

    return result
}
