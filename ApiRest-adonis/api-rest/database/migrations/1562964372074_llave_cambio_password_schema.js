'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LlaveCambioPasswordSchema extends Schema {
  up () {
    this.create('llave_cambio_passwords', (table) => {
      table.increments()
      table.string('email', 254).notNullable()
      table.string('key', 20).notNullable()
      table.boolean('used').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('llave_cambio_passwords')
  }
}

module.exports = LlaveCambioPasswordSchema
