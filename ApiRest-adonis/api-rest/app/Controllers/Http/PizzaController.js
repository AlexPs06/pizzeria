'use strict'
const Pizza = use("App/Models/Pizza")
const Historial = use("App/Models/Historial")


class PizzaController {
  async index({ response }) {
    let pizzas = await Pizza.all()

    return response.json(pizzas)
  }
  async store({ request, response }) {
    const pizzaInfo = request.only(['nombre', 'ingredientes', 'imagen', 'descripcion', 'precio'])
    const pizza = new Pizza()
    pizza.nombre = pizzaInfo.nombre
    pizza.ingredientes = pizzaInfo.ingredientes
    pizza.imagen = pizzaInfo.imagen
    pizza.descripcion = pizzaInfo.descripcion
    pizza.precio = pizzaInfo.precio
    await pizza.save()
    await Historial.create(this.logData(6, 201, `Pizza ${pizza.nombre} creado exitosamente`))

    return response.status(201).json(pizza)
  }
  async show({ params, response }) {
    const pizza = await Pizza.find(params.id)
    return response.json(pizza)
  }
  async update({ params, request, response }) {
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
    await Historial.create(this.logData(6, 201, `Pizza ${pizza.nombre} modificado exitosamente`))
    return response.status(201).json(pizza)
  }

  async delete({ params, response }) {
    const pizza = await Pizza.find(params.id)
    if (!pizza) {
      await Historial.create(this.logData(6, 404, `Datos incorrectos para eliminar pizza.`))
      return response.status(404).json({ data: 'Resource not found' })
    }
    await pizza.delete()
    await Historial.create(this.logData(6, 200, `Pizza ${pizza.nombre} eliminado exitosamente`))
    return response.status(204).json(null)
  }

  logData(tipo, estatus, informacion) {
    return {
      tipo: tipo,
      estatus: estatus,
      informacion: informacion
    }
  }
}

module.exports = PizzaController
