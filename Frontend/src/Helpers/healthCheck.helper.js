async function healthCheck() {
    const url = import.meta.env.VITE_BACKEND
    try {
        const response = await fetch(`${url}/api/v1/healthcheck`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export default healthCheck