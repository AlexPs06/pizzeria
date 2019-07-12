'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorialSchema extends Schema {
  up() {
    this.create('historials', (table) => {
      table.increments()
      table.enum('tipo', [
        'Login',
        'Signup',
        'Usuario',
        'Admin',
        'Compra',
        'Pizzas'
      ]).notNullable()
      table.integer('estatus').notNullable()
      table.text('informacion').defaultTo('Sin información')
      table.timestamps()
    })
  }

  down() {
    this.drop('historials')
  }
}

module.exports = HistorialSchema
