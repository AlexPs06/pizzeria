'use strict'
const User = use("App/Models/User")
const Historial = use("App/Models/Historial")
const LlaveCambioPassword = use("App/Models/LlaveCambioPassword")

const { validate } = use('Validator')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('SG.41raJkeHSzySNUK7SorARQ.zRg8XsaCa36_sgWgn-Q5FwDd33quUygz6pRq95Livc');


// auth.current.user.id


class UserController {
    async login({ request, auth, response }) {
        const userData = request.only(['email', 'password'])
        const rules = {
            email: 'required',
            password: 'required'
        }

        const validation = await validate(userData, rules)

        if (validation.fails()) {
            await Historial.create(this.logData(1, 400, validation.messages()[0].message))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.findBy('email', userData.email)
        if (user === null) {
            const message = `Email inexistente. Autentificación fallida para el correo: ${userData.email}.`
            await Historial.create(this.logData(1, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Email inexistente. Autentificación fallida.'
            })
        }

        const token = await auth.attempt(userData.email, userData.password)
        const message = `Usuario logueado: Nombre: ${user.username}; Email: ${user.email}.`
        await Historial.create(this.logData(1, 200, message))
        return response.status(200).json({
            status: 200,
            user: user,
            token: token
        })



    }

    async signup({ request, auth, response }) {
        const userData = request.only(['username', 'email', 'password'])
        const rules = {
            username: 'required|unique:users,username',
            email: 'required|email|unique:users,email',
            password: 'required|min:6'
        }

        const validation = await validate(userData, rules)

        if (validation.fails()) {
            await Historial.create(this.logData(2, 400, `Datos incompletos: ${validation.messages()[0].message}`))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.create(userData)
        const token = await auth.generate(user)
        const message = `Usuario creado: Nombre: ${userData.username}; Email: ${userData.email}.`
        await Historial.create(this.logData(2, 201, message))
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
        const validation = await validate(email, rules)
        if (validation.fails()) {
            await Historial.create(this.logData(3, 400, `Datos incompletos: ${validation.messages()[0].message}`))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.findBy('email', email)
        if (user === null) {
            const message = `Email ${email} inexistente para generar el codigo de cambio para contraseñas.`
            await Historial.create(this.logData(3, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Email inexistente para generar el código de cambio para la contraseña.'
            })
        }


        const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let OTP = '';
        for (let i = 0; i < 15; i++) {
            OTP += string[Math.floor(Math.random() * string.length)];
        }


        // const msg = {
        //     to: user.email,
        //     from: 'joalgosan24@gmail.com',
        //     subject: "Pizzería Ulalá :3",
        //     html: `<p>¡Hola ${user.name} ! Éste es tu código de validación para el cambio de tu contraseña: <strong>${OTP}</strong></p>`,
        // }

        // const statusSendGrid = await sgMail.send(msg)
        //     .then((resp) => {
        //         return 200
        //     })
        //     .catch((error) => {
        //         return 400
        //     })

        // if (statusSendGrid == 400) {
        //     await Historial.create(this.logData(3, 200, `Código NO enviado a ${user.email}. Error en Sendgrid: ${error}`))
        //     return response.status(400).json({
        //         status: 400,
        //         code: `Código NO enviado al correo`
        //     })
        // }

        await Historial.create(this.logData(3, 201, `${OTP} codigo generado para el cambio de contraseña del email: ${user.email}`))
        await LlaveCambioPassword.create({ email: user.email, key: OTP })
        // await Historial.create(this.logData(3, 200, `${OTP} codigo enviado exitosamente a ${user.email}`))
        // return response.status(201).json({
        //     status: 201,
        //     code: `¡Código enviado a su correo!`
        // })


        return response.status(201).json({
            status: 201,
            code: `Código de cambio: ${OTP}`
        })
    }


    async changePassword({ request, response }) {
        const userData = request.only(['email', 'password', 'key'])
        const rules = {
            email: 'required',
            password: 'required|min:6',
            key: 'required',
        }
        const validation = await validate(userData, rules)
        if (validation.fails()) {
            await Historial.create(this.logData(3, 400, `Datos incompletos: ${validation.messages()[0].message}`))
            return response.status(400).json({
                status: 400,
                warning: validation.messages()
            })
        }

        const user = await User.findBy('email', userData.email)

        if (user === null) {
            const message = `Email ${userData.email} inexistente para el cambio de contraseña.`
            await Historial.create(this.logData(3, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Email inexistente.'
            })
        }
        const keyID = await LlaveCambioPassword.query()
            .where('email', userData.email)
            .where('key', userData.key)
            .where('used', false)
            .fetch()

        if (keyID.length == 0) {
            const message = `LLave ${userData.key} inválido para el cambio de contraseña.`
            await Historial.create(this.logData(3, 400, message))
            return response.status(400).json({
                status: 400,
                warning: 'Llave inválido.'
            })
        }
        const key = await LlaveCambioPassword.find(keyID.toJSON()[0].id)
        key.used = true
        await key.save()

        user.password = userData.password
        await user.save()
        await Historial.create(this.logData(3, 200, `Cambio de contraseña exitosa para el email ${userData.email}`))
        return response.status(200).json({
            status: 200,
            message: 'Cambio de contraseña exitosa.'
        })

    }

    logData(tipo, estatus, informacion) {
        return {
            tipo: tipo,
            estatus: estatus,
            informacion: informacion
        }
    }
}

module.exports = UserController
