'use strict'

const Route = use('Route')

Route.group(() => {



    /*
     * PARA TODO END POINT QUE ESTÉ ACOMPAÑADO DEL MÉTODO "middleware"
     * SERÁ NECESARIO ENVIAR EN LA CABECERA EL TOKEN DEL USUARIO
     */


    /**    ¡NUEVO!
     *La ruta Route.post('crear_admin', 'UserController.crearAdmin') 
     *es inexistente ya que se ha automatizado la creación de admin default
     */

    Route.post('crear_admin', 'UserController.crearAdmin')



    Route.post('login', 'UserController.login')
    Route.post('signup', 'UserController.signup')


    Route.post('recovery_password/codigo_de_cambio', 'UserController.getChangeCode')
    Route.post('recovery_password/cambiar', 'UserController.changePassword')
    Route.post('check_account', 'UserController.checkAccount')



    Route.put('profile/update', 'UserController.updateProfile').middleware(['auth:jwt'])



    Route.get('logs', 'HistorialController.index').middleware(['auth:jwt'])
    Route.get('logs_user', 'HistorialController.show').middleware(['auth:jwt'])



    Route.get('pizzas', 'PizzaController.index')
    Route.post('pizzas', 'PizzaController.store').middleware(['auth:jwt'])
    Route.get('pizzas/:id', 'PizzaController.show')
    Route.put('pizzas/:id', 'PizzaController.update').middleware(['auth:jwt'])
    Route.delete('pizzas/:id', 'PizzaController.delete').middleware(['auth:jwt'])



    Route.get('compras', 'CompraController.index').middleware(['auth:jwt'])

    // ¡NUEVO! Retorna una lista de usuarios con sus respectivas compras.
    Route.post('compras', 'CompraController.store').middleware(['auth:jwt'])

    //¡NUEVO! End point modificado de "compras/:id" a "compras_usuario"
    //Con el token del usuario basta para obtener las compras
    Route.get('compras_usuario', 'CompraController.show').middleware(['auth:jwt'])
    Route.put('compras/:id', 'CompraController.update').middleware(['auth:jwt'])
    Route.delete('compras/:id', 'CompraController.delete').middleware(['auth:jwt'])

}).prefix('api/v1')