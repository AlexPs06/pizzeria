'use strict'
const Historial = use("App/Models/Historial")
const User = use("App/Models/User")



class HistorialController {
    async index({ auth, response }) {
        const admin = await User.findBy('email', 'admin@admin.com')
        if (auth.current.user.user_type == 'client') {
            await Historial.create(  this.logData(admin.id, 5, 400, `El Usuario ${auth.current.user.username} con email ${auth.current.user.email} ha intentando acceder a los logs de todos los usuarios.`))
            return response.status(400).json({
                status: 400,
                message: 'Acceso solo a administradores.'
            })
        }

        await Historial.create( this.logData(admin.id, 5, 200, 'Obtención de LOGS'))
        const logs = await User.query().with('historials').fetch()
        return response.status(200).json({
            status: 200,
            logs: logs
        })
    }


    async show({ auth, response }) {
        await Historial.create( this.logData(auth.current.user.id, 5, 200, 'Obtención de LOGS'))
        const logs = await Historial.query().where('user_id', auth.current.user.id).fetch()
        return response.status(200).json({
            status: 200,
            logs: logs
        })
    }


    logData(user_id, tipo, estatus, informacion) {
        return {
            user_id: user_id,
            tipo: tipo,
            estatus: estatus,
            informacion: informacion
        }
    }


}

module.exports = HistorialController
