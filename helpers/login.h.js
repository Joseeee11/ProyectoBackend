const JWT = require('jsonwebtoken')
const cookie = require('cookie')


class login{
    async tockeLogin(inicia){
        const resultado = await JWT.sign(
            {
                name: inicia.usuario,
                role: inicia.rol
            },
            process.env.SECRETO,
            {
                expiresIn:'1800s'
            }
        )
        return  await cookie.serialize('GalletaDeToken', resultado, {
            httpOnly: true,
            secure: false,//process.env.VERI =="produccion",
            sameSite:'strict',
            maxAge: 1800000,
            path:'/'

        })
    }
    async verificarToken(Token){
        console.log("llegaa");

            try {
                const sellado = JWT.verify(Token,process.env.SECRETO);
                 return sellado
              } catch(error) {
                console.log(error);
                return null
            }


        // return new Promise( (resolve, reject) => {

            // JWT.verify(Token,process.env.SECRETO, function(err, decoded) {
            //     if (err) {
            //         console.log(err.message);
            //         return reject(err.message)
            //     }
                
                
            //     console.log("Salimos :"+decoded);
            //     resolve(decoded)

            //   });
              


        //     const sellado = JWT.verify(Token,process.env.SECRETO,{})
        //     console.log(sellado);
        //         resolve(sellado)

        // })


        //      const sellado = await JWT.verify(Token,process.env.SECRETO)
        //      return sellado
        // } catch(err){
        //     return null
        // }


    }
}

module.exports = new login();