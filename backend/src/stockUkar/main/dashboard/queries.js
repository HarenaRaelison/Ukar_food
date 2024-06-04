const userNumber = () => {
    return ('SELECT COUNT("nameUser") FROM users')
}
module.exports = {
    userNumber
}