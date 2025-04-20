const url = import.meta.env.VITE_BACKEND
async function checkToken() {
    try {
        const response = await fetch(`${url}/api/v1/user/verifyJWT`, {
            method: "POST",
            credentials: "include",
        })
        const data = await response.json()
        console.log(data)
        return data 
    } catch (error) {
        throw new Error(error)
    }
}

async function loginUserViaEmail(email, password) {
    try {
        const response = await fetch(`${url}/api/v1/user/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}
async function loginUserViaUsername(username, password) {
    try {
        const response = await fetch(`${url}/api/v1/user/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export { checkToken , loginUserViaEmail , loginUserViaUsername }