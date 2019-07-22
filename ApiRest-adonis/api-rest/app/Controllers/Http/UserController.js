'use strict'

const Env = use('Env')
const { validate } = use('Validator')
const User = use("App/Models/User")
const Historial = use("App/Models/Historial")
const LlaveOperacionesEspeciales = use("App/Models/LlaveOperacionesEspeciales")
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey( Env.get('SEND_GRID_TOKEN') );


class UserController {

    async login({ request, auth, response }) {


        const userData = request.only(['email', 'password'])
        const rules = {
            email: 'required|email',
            password: 'required'
        }

        const anonymousUser = await this.getAnonymousUser(userData.email)
        const validation = await validate(userData, rules)

        if (validation.fails()) {
            await Historial.create(this.logData(anonymousUser.id, 1, 400, validation.messages()[0].message))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }


        const user = await User.findBy('email', userData.email)
        if (user === null) {
            const message = `Email inexistente. Autentificación fallida para el correo: ${userData.email}.`
            await Historial.create(this.logData(anonymousUser.id, 1, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Email inexistente. Autentificación fallida.'
            })
        }

        if (user.locked == 1) {
            await Historial.create(this.logData(user.id, 8, 400, `Cuenta bloqueada. El codigo de verificación de cuenta se ha enviado al correo.`))
            return response.status(400).json({
                status: 400,
                warning: 'Cuenta bloqueada. Te hemos enviado el código de verificación de cuenta a tu correo.'
            })
        }


        let authAttempt = ''
        try {
            authAttempt = await auth.attempt(userData.email, userData.password)
            user.intents = 0
            user.locked = 0
            await user.save()

            const message = `Usuario logueado: Nombre: ${user.username}; Email: ${user.email}.`
            await Historial.create(this.logData(user.id, 1, 200, message))
            return response.status(200).json({
                status: 200,
                user: user,
                token: authAttempt.token
            })
        } catch (error) {
            user.intents += 1
            if (user.intents == 2) {
                user.locked = 1
                await user.save()
                const oneTimeCode = this.getOneTimeCode()
                await LlaveOperacionesEspeciales.create({
                    email: user.email,
                    key: oneTimeCode,
                    check_account: true
                })
                await Historial.create(this.logData(user.id, 8, 400, `Cuenta bloqueada.`))
                return response.status(400).json({
                    status: 400,
                    warning: 'Cuenta bloqueada. Te hemos enviado el código de verificación de cuenta a tu correo.',
                    code: `Codigo: ${oneTimeCode}` //eliminar
                })
            }

            await user.save()
            await Historial.create(this.logData(user.id, 1, 400, `Login fallido`))
            return response.status(400).json({
                status: 400,
                warning: 'Datos incorrectos.'
            })
        }


    }

    async signup({ request, auth, response }) {
        const userData = request.only(['username', 'email', 'password'])
        const rules = {
            username: 'required|unique:users,username',
            email: 'required|email|unique:users,email',
            password: 'required|min:6'
        }

        const anonymousUser = await this.getAnonymousUser(userData.email)
        const validation = await validate(userData, rules)

        if (validation.fails()) {
            await Historial.create(this.logData(anonymousUser.id, 2, 400, `Datos incompletos: ${validation.messages()[0].message}`))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.create(userData)
        const { token } = await auth.generate(user)
        const message = `Usuario creado: Nombre: ${userData.username}; Email: ${userData.email}`
        await Historial.create(this.logData(user.id, 2, 201, message))
        return response.status(201).json({
            status: 201,
            user: user,
            token: token
        })
    }

    async getChangeCode({ request, response }) {
        const { email } = request.only(['email'])
        const rules = {
            email: 'required',
        }

        const anonymousUser = await this.getAnonymousUser(userData.email)
        const validation = await validate(email, rules)

        if (validation.fails()) {
            await Historial.create(this.logData(anonymousUser.id, 3, 400, `Datos incompletos para generar codigo de cambio para contraseña: ${validation.messages()[0].message}`))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.findBy('email', email)
        if (user === null) {
            const message = `Email ${email} inexistente para generar el codigo de cambio para contraseñas.`
            await Historial.create(this.logData(anonymousUser.id, 3, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Email inexistente para generar el código de cambio para la contraseña.'
            })
        }


        const oneTimeCode = this.getOneTimeCode()

        //================= Descomentar de aqui para el envio de codigo al correo=========================
        // const msg = {
        //     to: user.email,
        //     from: 'joalgosan24@gmail.com',
        //     subject: "Pizzería Ulalá :3",
        //     html: `<p>¡Hola ${user.name} ! Éste es tu código de validación para el cambio de tu contraseña: <strong>${oneTimeCode}</strong></p>`,
        // }
        // const statusSendGrid = await sgMail.send(msg)
        //     .then((resp) => {
        //         return 200
        //     })
        //     .catch(error => {
        //         return 400
        //     })
        // console.log(statusSendGrid)
        // if (statusSendGrid == 400) {
        //     await Historial.create(this.logData(user.id, 3, 200, `Código NO enviado a ${user.email} Inautorizado. Error en Sendgrid.`))
        //     return response.status(400).json({
        //         status: 400,
        //         warning: `Código NO enviado al correo`
        //     })
        // }

        // await Historial.create(this.logData(3, 201, `${oneTimeCode} codigo generado para el cambio de contraseña del email: ${user.email}`))
        await LlaveOperacionesEspeciales.create({ email: user.email, key: oneTimeCode })
        await Historial.create(this.logData(user.id, 3, 200, `Codigo de cambio de contraseña enviado exitosamente.`))
        // return response.status(201).json({
        //     status: 201,
        //     code: `¡Código enviado a su correo!`
        // })

        //================= hasta aquiiiiiiiiiiiiiiiiii========================


        return response.status(201).json({
            status: 201,
            code: `Código de cambio: ${oneTimeCode}`
        })
    }


    async changePassword({ request, response }) {
        const userData = request.only(['email', 'password', 'key'])
        const rules = {
            email: 'required',
            password: 'required|min:6',
            key: 'required',
        }
        const anonymousUser = await this.getAnonymousUser(userData.email)
        const validation = await validate(userData, rules)

        if (validation.fails()) {
            await Historial.create(this.logData(anonymousUser.id, 3, 400, `Datos incompletos: ${validation.messages()[0].message}`))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.findBy('email', userData.email)

        if (user === null) {
            const message = `Email ${userData.email} inexistente para el cambio de contraseña.`
            await Historial.create(this.logData(anonymousUser.id, 3, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Email inexistente.'
            })
        }
        const keyID = await LlaveOperacionesEspeciales.query()
            .where('email', userData.email)
            .where('key', userData.key)
            .where('check_account', false)
            .where('used', false)
            .fetch()

        if (keyID.toJSON().length == 0) {
            const message = `LLave inválido para el cambio de contraseña.`
            await Historial.create(this.logData(user.id, 3, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Llave inválido.'
            })
        }

        const key = await LlaveOperacionesEspeciales.find(keyID.toJSON()[0].id)
        key.used = true
        await key.save()

        user.password = userData.password
        await user.save()
        await Historial.create(this.logData(user.id, 3, 200, `Cambio de contraseña exitosa para el email ${userData.email}`))
        return response.status(200).json({
            status: 200,
            message: 'Cambio de contraseña exitosa.'
        })

    }

    async checkAccount({ request, response }) {
        const userData = request.only(['email', 'key'])
        const rules = {
            email: 'required',
            key: 'required',
        }
        const anonymousUser = await this.getAnonymousUser(userData.email)
        const validation = await validate(userData, rules)

        if (validation.fails()) {
            await Historial.create(this.logData(anonymousUser.id, 8, 400, `Datos incompletos: ${validation.messages()[0].message}`))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.findBy('email', userData.email)

        if (user === null) {
            const message = `Email ${userData.email} inexistente para el la verficación de cuenta.`
            await Historial.create(this.logData(anonymousUser.id, 8, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Email inexistente.'
            })
        }
        const keyID = await LlaveOperacionesEspeciales.query()
            .where('email', userData.email)
            .where('key', userData.key)
            .where('check_account', true)
            .where('used', false)
            .fetch()

        if (keyID.toJSON().length == 0) {
            const message = `LLave inválido para la verificación de cuenta.`
            await Historial.create(this.logData(user.id, 8, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Llave inválido.'
            })
        }

        const key = await LlaveOperacionesEspeciales.find(keyID.toJSON()[0].id)
        key.used = true
        await key.save()

        user.intents = 0
        user.locked = 0
        await user.save()

        await Historial.create(this.logData(user.id, 8, 200, `Usuario ${userData.username} desbloqueado`))
        return response.status(200).json({
            status: 200,
            message: 'Cuenta desbloqueada'
        })
    }


    async updateProfile({ request, auth, response }) {
        const userData = request.only(['username', 'password', 'email'])
        const rules = {
            username: 'required',
            email: 'required',
            password: 'required|min:6'
        }

        const validation = await validate(userData, rules)

        if (validation.fails()) {
            await Historial.create(this.logData(auth.current.user.id, 4, 400, `Datos incompletos: ${validation.messages()[0].message} para actualizar perfil del usuario.`))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.findBy('email', userData.email)
        if (user === null) {
            const message = `Email ${userData.email} inexistente para la actualización del perfil.`
            await Historial.create(this.logData(auth.current.user.id, 4, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Email inexistente para la actualización del perfil.'
            })
        }

        user.username = userData.username
        user.password = userData.password

        try {
            await user.save()
            await Historial.create(this.logData(user.id, 4, 200, `Actualización exitosa del perfil.`))
            return response.status(200).json({
                status: 200,
                message: 'Actualización de perfil exitosa.'
            })
        } catch (error) {
            await Historial.create(this.logData(user.id, 4, 400, `Actualización fallida. ${error.sqlMessage}`))
            return response.status(400).json({
                status: 400,
                message: `Actualización fallida. ${error.sqlMessage}`
            })
        }

    }


    getOneTimeCode() {
        const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let OTC = '';
        for (let i = 0; i < 15; i++) {
            OTC += string[Math.floor(Math.random() * string.length)];
        }
        return OTC
    }

    logData(user_id, tipo, estatus, informacion) {
        return {
            user_id: user_id,
            tipo: tipo,
            estatus: estatus,
            informacion: informacion
        }
    }

    async getAnonymousUser(email) {
        let anonymousUser = null

        if (email) {
            anonymousUser = await User.findBy('email', email)
        }

        if (anonymousUser === null) {
            anonymousUser = await User.findBy('email', 'anonimo@anonimo.com')
        }

        return anonymousUser
    }
}

module.exports = UserController
