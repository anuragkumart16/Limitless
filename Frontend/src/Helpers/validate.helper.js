function validateEmail(email) {
    if (!email) {
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
function validateUsername(username) {
    if (!username) {
        return false
    }
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/
    return usernameRegex.test(username)
}
function validatePassword(password){
    if (!password) {
        return false
    }
    return true
}

function isEmail(value){
    if (value.includes("@")) {
        return true
    }
    return false
}

export { validateEmail , validateUsername , validatePassword ,isEmail}