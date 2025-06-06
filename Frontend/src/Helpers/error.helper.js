import sendEmail from "../Services/email.service"

function handleError(error,navigate){
    // console.log(error)
    const isOnline = () => navigator.onLine
      if (!isOnline()) {
        navigate('/error',{state:{error:'Network Error',message:'Please check your internet connection'}})
      }else{
        sendEmail({to:`${import.meta.env.VITE_EMAIL_ADDRESS}`,subject:'Error on the website',message:`Error: ${'Server not found'+error}`})
        navigate('/error',{state:{error:'Server Error',message:'Something went wrong. We\'re working on it!'}})
      }
}

function handleResponseError(response,setter){
  // console.log(response,'this is data from error response')
    if (!response.success){
        setter(`${response.message}!`)
        return
    }else{
        setter(null)
        return
    }
}

export  { handleError , handleResponseError }