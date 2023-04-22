const Verificadorneitor3000 = require("../helpers/login.h") 

class verificador3000{
    async verificador(req, res, next){
        console.log("llega");
        try{
            const token = req.cookies.GalletaDeToken
            var sellado = await Verificadorneitor3000.verificarToken(token) 
            if(sellado == null){
                res.status(404)
                return res.send("Token Invalido")
            }
            return next()
            
        }catch(error) {
            console.log('error al verificar');
            console.log(error);
            res.status(404)
            return res.send("Necesita tener un token")
        }
    }  
     async restringirSolicitante(req, res, next){
        console.log("llega");
        try{
            const token = req.cookies.GalletaDeToken
            var sellado = await Verificadorneitor3000.verificarToken(token)
            if(sellado == null){
                res.status(404)
                return res.send("Token Invalido")
            }
            if (sellado.role != "personal" && sellado.role != "admin" ) {
                console.log(sellado.role);
                res.status(404)
                return res.send("No tienes el rol necesario")
            }
            return next()
            
        }catch(error) {
            console.log('error al verificar');
            console.log(error);
            res.status(404)
            return res.send("Necesita tener un token")
        }
    } async soloAdmin(req, res, next){
        console.log("llega");
        try{
            const token = req.cookies.GalletaDeToken
            var sellado = await Verificadorneitor3000.verificarToken(token)
            if(sellado == null){
                res.status(404)
                return res.send("Token Invalido")
            }
            if (sellado.role != "admin" ) {
                console.log(sellado.role);
                res.status(404)
                return res.send("No tienes el rol necesario")
            }
            return next()
            
        }catch(error) {
            console.log('error al verificar');
            console.log(error);
            res.status(404)
            return res.send("Necesita tener un token")
        }
    }
    async seccion(req, res, next) {
        const {GalletaDeToken} = req.cookies
        if (!GalletaDeToken) {
          res.status(404).redirect('/login')
        }
        next()
      }
}
module.exports = new verificador3000();