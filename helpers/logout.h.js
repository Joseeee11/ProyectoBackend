const cookie = require('cookie')


class logout{
    cerrar(){
        const token = null
        return cookie.serialize('GalletaDeToken', token , {
            httpOnly: true,
            secure: false,//process.env.VERI =="produccion",
            sameSite:'strict',
            maxAge: 0,
            path:'/'

        })
    }
}

module.exports = new logout();