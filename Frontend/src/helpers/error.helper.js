import sendEmail from "./email.helper"

function handleError(error,navigate){
    console.log(error)
    const isOnline = () => navigator.onLine
      if (!isOnline()) {
        navigate('/error',{state:{error:'Network Error',message:'Please check your internet connection'}})
      }else{
        sendEmail({to:`${import.meta.env.VITE_EMAIL_ADDRESS}`,subject:'Error on the website',message:`Error: ${'Server not found'+error}`})
        navigate('/error',{state:{error:'Server Error',message:'Something went wrong. We\'re working on it!'}})
      }
}

export default handleError