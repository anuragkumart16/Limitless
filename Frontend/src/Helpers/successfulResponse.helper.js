function handleSuccessResponse(data,setter) {
    if (data.success){
        setter(`${data.message}!`)
        localStorage.setItem('accessToken',data.data.accessToken)
        localStorage.setItem('refreshToken',data.data.refreshToken)
        return
    }else{
        setter(null)
        localStorage.clear()
        return
    }
}

function handleSuccess(data,setter) {
    if (data.success){
        setter(`${data.message}!`)
        return
    }else{
        setter(null)
        return
    }
}

export { handleSuccessResponse ,handleSuccess}