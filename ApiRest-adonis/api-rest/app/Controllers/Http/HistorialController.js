'use strict'
const Historial = use("App/Models/Historial")


class HistorialController {
    async index({ auth, response}){
        if( auth.current.user.user_type == 'client'){
            await Historial.create(this.logData(4, 400, `Acceso no autorizado a la lista de LOGS para: Usuario: ${auth.current.user.username}, Email: ${auth.current.user.email}, Tipo de usuario: ${auth.current.user.user_type}`))
            return response.status(400).json({
                status: 400,
                message: 'Acceso solo a administradores.'
            })
        }

        await Historial.create(await this.logData(4, 200, 'Obtención de LOGS'))
        const logs = await Historial.all()
        return response.status(200).json({
            status: 200,
            logs: logs
        })
    }


    async logData(tipo, estatus, informacion) {
        return {
            tipo: tipo,
            estatus: estatus,
            informacion: informacion
        }
    }


}

module.exports = HistorialController
