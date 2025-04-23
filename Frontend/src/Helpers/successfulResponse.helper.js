function handleSuccessResponse(data,setter) {
    if (data.success){
        setter(`${data.message}!`)
        // console.log(data,'this is data from success response')
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
        // console.log(data,'this is data from success response')
        setter(`${data.message}!`)
        return
    }else{
        setter(null)
        return
    }
}

export { handleSuccessResponse ,handleSuccess}