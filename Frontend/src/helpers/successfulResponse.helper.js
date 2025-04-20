function handleSuccessResponse(data,setter) {
    if (data.success){
        setter(`${data.message}!`)
        return
    }else{
        setter(null)
        return
    }
}

export { handleSuccessResponse }