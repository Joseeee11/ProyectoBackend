const logoutH = require("../helpers/logout.h")

class logout {
    async cerrar(){
        return await logoutH.cerrar()
        
    }
}

var logoutC = new logout()
module.exports = logoutC