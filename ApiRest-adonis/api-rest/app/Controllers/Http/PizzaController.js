'use strict'
const Pizza = use("App/Models/Pizza")
const Historial = use("App/Models/Historial")


class PizzaController {
  async index({ response }) {
    let pizzas = await Pizza.all()
    return response.json(pizzas)
  }
  
  async store({ auth, request, response }) {
    const admin = await User.findBy('email', 'admin@admin.com')

    if (auth.current.user.user_type == 'client') {
      await Historial.create( this.logData(admin.id, 7, 400, `El usuario ${auth.current.user.username} con email ${auth.current.user.email} ha intentado crear pizzas.`))
      return response.status(400).json({
        status: 400,
        message: 'Acceso solo a administradores.'
      })
    }

    const pizzaInfo = request.only(['nombre', 'ingredientes', 'imagen', 'descripcion', 'precio'])
    const pizza = new Pizza()
    pizza.nombre = pizzaInfo.nombre
    pizza.ingredientes = pizzaInfo.ingredientes
    pizza.imagen = pizzaInfo.imagen
    pizza.descripcion = pizzaInfo.descripcion
    pizza.precio = pizzaInfo.precio
    await pizza.save()
    await Historial.create( this.logData(admin.id, 7, 201, `Pizza ${pizza.nombre} creado exitosamente`))
    return response.status(201).json(pizza)
  }

  async show({ params, response }) {
    const pizza = await Pizza.find(params.id)
    return response.json(pizza)
  }

  async update({ params, auth, request, response }) {
    const admin = await User.findBy('email', 'admin@admin.com')

    if (auth.current.user.user_type == 'client') {
      await Historial.create( this.logData(admin.id, 7, 400, `El suario ${auth.current.user.username} con email ${auth.current.user.email} ha intentado modificar pizza.`))
      return response.status(400).json({
        status: 400,
        message: 'Acceso solo a administradores.'
      })
    }

    const pizzaInfo = request.only(['nombre', 'ingredientes', 'imagen', 'descripcion', 'precio'])

    const pizza = await Pizza.find(params.id)
    if (!pizza) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    pizza.nombre = pizzaInfo.nombre
    pizza.ingredientes = pizzaInfo.ingredientes
    pizza.imagen = pizzaInfo.imagen
    pizza.descripcion = pizzaInfo.descripcion
    pizza.precio = pizzaInfo.precio
    await pizza.save()
    await Historial.create( this.logData(admin.id, 7, 201, `Pizza ${pizza.nombre} modificado exitosamente`))
    return response.status(201).json(pizza)
  }

  async delete({ params, auth, response }) {
    const admin = await User.findBy('email', 'admin@admin.com')

    if (auth.current.user.user_type == 'client') {
      await Historial.create( this.logData(admin.id, 7, 400, `El suario ${auth.current.user.username} con email ${auth.current.user.email} ha intentado eliminar pizza.`))
      return response.status(400).json({
        status: 400,
        message: 'Acceso solo a administradores.'
      })
    }

    const pizza = await Pizza.find(params.id)
    if (!pizza) {
      await Historial.create( this.logData(admin.id, 7, 404, `Pizza no encontrado.`))
      return response.status(404).json({ data: 'Resource not found' })
    }
    await pizza.delete()
    await Historial.create( this.logData(admin.id, 7, 200, `Pizza ${pizza.nombre} eliminado exitosamente`))
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

module.exports = PizzaController
