async function healthCheck() {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/v1/healthcheck/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default healthCheck