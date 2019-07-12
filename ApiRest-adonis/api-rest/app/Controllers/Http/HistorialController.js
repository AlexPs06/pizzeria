'use strict'
const Historial = use("App/Models/Historial")


class HistorialController {
    async index({ response}){
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
