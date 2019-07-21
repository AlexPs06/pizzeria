'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LlaveOperacionesEspecialesSchema extends Schema {
  up () {
    this.create('llave_operaciones_especiales', (table) => {
      table.increments()
      table.string('email', 254).notNullable()
      table.string('key', 20).notNullable()
      table.boolean('check_account').defaultTo(false)
      table.boolean('used').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('llave_operaciones_especiales')
  }
}

module.exports = LlaveOperacionesEspecialesSchema
