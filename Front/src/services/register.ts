import api from './api'

export async function postRegister(token: string | null) {
    const result = await api.post("/registers")
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error.response.data
    });

    return result
}

export async function getRegister(token: string | null, startDate: string, endDate: string) {
    const result = await api.post("/registers/list", { startDate, endDate })
    .then((response) => {
        return response.data.resultDto
    })
    .catch((error) => {
        return error.response.data
    });

    return result
}
