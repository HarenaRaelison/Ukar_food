
const checkUser = () =>{
    return('SELECT "nameUser", "passUser" FROM public.users WHERE "nameUser" = $1 AND "passUser" = $2')
}


module.exports = {
    checkUser
  }