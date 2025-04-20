const url = import.meta.env.VITE_BACKEND
async function checkToken() {
    try {
        const response = await fetch(`${url}/api/v1/user/verifyJWT`, {
            method: "POST",
            credentials: "include",
        })
        const data = await response.json()
        return data 
    } catch (error) {
        throw new Error(error)
    }
}

export { checkToken }