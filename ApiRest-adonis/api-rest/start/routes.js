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
  EJECUTAR UNA SOLA VEZ EL END-POINT PARA CREAR ADMINISTRADOR

  LOS DATOS DEL USUARIO LOS PUSE MANUAL

  Route.post('crear_admin', 'UserController.crearAdmin')



  */


  Route.post('crear_admin', 'UserController.crearAdmin')

  Route.post('login', 'UserController.login')
  Route.post('signup', 'UserController.signup')

  Route.post('recovery_password/codigo_de_cambio', 'UserController.getChangeCode')
  Route.post('recovery_password/cambiar', 'UserController.changePassword')
  Route.post('check_account', 'UserController.checkAccount')


  Route.get('logs', 'HistorialController.index').middleware(['auth:jwt'])
  Route.get('logs_user', 'HistorialController.show').middleware(['auth:jwt'])


  Route.put('profile/update', 'UserController.updateProfile').middleware(['auth:jwt'])


  Route.post('pizzas', 'PizzaController.store').middleware(['auth:jwt'])
  Route.get('pizzas', 'PizzaController.index')
  Route.get('pizzas/:id', 'PizzaController.show')
  Route.put('pizzas/:id', 'PizzaController.update').middleware(['auth:jwt'])
  Route.delete('pizzas/:id', 'PizzaController.delete').middleware(['auth:jwt'])


  Route.post('compras', 'CompraController.store').middleware(['auth:jwt'])
  Route.get('compras', 'CompraController.index').middleware(['auth:jwt'])
  Route.get('compras/:id', 'CompraController.show').middleware(['auth:jwt'])
  Route.put('compras/:id', 'CompraController.update').middleware(['auth:jwt'])
  Route.delete('compras/:id', 'CompraController.delete').middleware(['auth:jwt'])

}).prefix('api/v1')
