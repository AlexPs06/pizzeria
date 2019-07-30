'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.enum('user_type', ['admin', 'client']).defaultTo('client')
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('locked').defaultTo(0)
      table.integer('intents').unsigned().defaultTo(0)
      table.timestamps()
    })


    this.schedule(async (trx) => {

      const User = use("App/Models/User")
      const existAdmin = await User.findBy('email', 'admin@admin.com')
      if (existAdmin === null) {
        await User.create({
          username: 'admin',
          email: 'admin@admin.com',
          password: 'admin1234',
          user_type: 1
        })
      }

      const existAnonymous = await User.findBy('email', 'anonimo@anonimo.com')
      if (existAnonymous === null) {
        await User.create({
          username: 'anonimo',
          email: 'anonimo@anonimo.com',
          password: 'anonimo0000000000anonimo'
        })
      }
    
    })

  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
