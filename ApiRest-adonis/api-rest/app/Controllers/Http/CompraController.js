'use strict'
const User = use("App/Models/User")
const Compra = use("App/Models/Compra")
const Historial = use("App/Models/Historial")


const stripe = require('stripe')('sk_test_WPxp1ZDJ23xC0gywfy6S3fgZ00421Q9xmz');

class CompraController {
    async index({ auth, response }) {
        let compras = await User.query().with('compras').fetch()
        await Historial.create(this.logData(auth.current.user.id, 6, 200, `Adquisición de lista de compras`))
        return response.json(compras)
    }

    async store({ request, auth,  response }) {
        
        const compra = new Compra()
        compra.user_id = auth.current.user.id
        compra.token = request.body.token
        compra.lista = request.body.lista
        compra.direccion = request.body.direccion
        compra.referencias = request.body.referencias
        compra.telefono = request.body.telefono
        compra.nombre = request.body.nombre
        compra.correo = request.body.correo
        compra.estatus = request.body.estatus
        compra.tokenNotificaciones = request.body.tokenNotificaciones

        let carrito = JSON.parse(request.body.lista)
        let total = 0.0
        carrito.forEach(element => {
            total = parseFloat(element.precio) + total
            console.log(element.precio)
        });

        const token = request.body.token;
        try {
            (async () => {
                const charge = await stripe.charges.create({
                    amount: total * 100,
                    currency: 'mxn',
                    description: "Compra pizza",
                    source: token,
                });
            })();
            await Historial.create(this.logData(auth.current.user.id, 6, 201, `Compra exitosa de ${total}.`))

        } catch (error) {
            await Historial.create(this.logData(auth.current.user.id, 6, 400, `Compra fallida de ${total}. Error desde Stripe.`))
            console.error(error)
        }

        await compra.save()
        return response.status(201).json(compra)
    }

    async show({ params, response }) {
        const compra = await Compra.find(params.id)
        return response.json(compra)
    }

    async update({ params, auth,  request, response }) {
        const admin = await User.findBy('email', 'admin@admin.com')

        if( auth.current.user.user_type == 'client'){
            await Historial.create(this.logData(admin.id, 6, 400, `El usuario ${auth.current.user.username} con email ${auth.current.user.email} ha intentado modificar datos de alguna compra.`))
            return response.status(400).json({
                status: 400,
                message: 'Acceso solo a administradores.'
            })
        }

        const compraInfo = request.only(['token', 'lista', 'direccion', 'referencias', 'telefono', 'nombre', 'correo', 'estatus'])
        const compra = await Compra.find(params.id)
        
        if (!compra) {
            await Historial.create(this.logData(admin.id, 6, 406, `Datos incorrectos para la actualización de la compra.`))
            return response.status(404).json({ data: 'Resource not found' })
        }

        compra.token = compraInfo.token
        compra.lista = compraInfo.lista
        compra.direccion = compraInfo.direccion
        compra.referencias = compraInfo.referencias
        compra.telefono = compraInfo.telefono
        compra.nombre = compraInfo.nombre
        compra.correo = compraInfo.correo
        compra.estatus = compraInfo.estatus

        await compra.save()
        await Historial.create(this.logData(admin.id, 6, 200, `Actualización exitoso de los datos de la compra del usuario ${compra.nombre}`))
        return response.status(201).json(compra)
    }

    async delete({ params, auth,  response }) {
        const compra = await Compra.find(params.id)
        if (!compra) {
            await Historial.create(this.logData(auth.current.user.id, 6, 406, `Compra no encontrado.`))
            return response.status(404).json({ data: 'Resource not found' })
        }
        await Historial.create(this.logData(auth.current.user.id, 6, 200, `Eliminación exitosa de la compra del usuario ${compra.nombre}`))
        await compra.delete()
        return response.status(204).json(null)
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

module.exports = CompraController