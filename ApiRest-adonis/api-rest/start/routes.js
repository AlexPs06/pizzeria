'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  /*
  enviar codigo de cmabio al correo del sujeto :U
  logs para la compra de pizzas
  */



  Route.post('login', 'UserController.login')
  Route.post('signup', 'UserController.signup')

  Route.post('recovery_password/codigo_de_cambio', 'UserController.getChangeCode')
  Route.post('recovery_password/cambiar', 'UserController.changePassword')

  Route.get('admin/logs', 'HistorialController.index')









  Route.post('pizzas', 'PizzaController.store')
  Route.get('pizzas', 'PizzaController.index')
  Route.get('pizzas/:id', 'PizzaController.show')
  Route.put('pizzas/:id', 'PizzaController.update')
  Route.delete('pizzas/:id', 'PizzaController.delete')


  Route.post('compras', 'CompraController.store')
  Route.get('compras', 'CompraController.index')
  Route.get('compras/:id', 'CompraController.show')
  Route.put('compras/:id', 'CompraController.update')
  Route.delete('compras/:id', 'CompraController.delete')

}).prefix('api/v1')
