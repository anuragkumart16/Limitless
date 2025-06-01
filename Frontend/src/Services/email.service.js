import emailjs from "emailjs-com"

const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID
const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID
const publicKeyId = import.meta.env.VITE_EMAIL_PUBLIC_KEY

async function sendEmail(templateParams){
  return emailjs
    .send(
      `${serviceId}`, 
      `${templateId}`, 
      templateParams,    
      `${publicKeyId}`     
    )
    .then((response) => {
      console.log("Email sent successfully", response)
      return response
    })
    .catch((error) => {
      console.error("Error sending email", error)
      throw error
    })
}

export default sendEmail