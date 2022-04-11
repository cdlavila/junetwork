const bcrypt = require('bcrypt')

// Helpers
const statusCode = require('../helpers/status-code')
const Response = require('../helpers/response')
const Token = require('../helpers/token')

// Utils
const nodemailer = require('../utils/nodemailer')
const redis = require('../utils/redis')
const twilio = require('../utils/twilio')

// Repositories
const UserRepository = require('../repositories/user-repository')
const FollowerRepository = require('../repositories/follower-repository')
const { promisify } = require('util')

class UserService {
  static async signUp (res, data) {
    const user = await UserRepository.create(data)
    return Response.success(res, statusCode?.CREATED, user, 'You have registered successfully')
  }

  static async signIn (res, data) {
    // Find user by email
    const user = await UserRepository.getByEmail(data?.email)
    if (!user) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No user with this email exists')
    }

    // Validate password
    const isMatch = bcrypt.compareSync(data?.password, user?.password)
    if (!isMatch) {
      return Response.error(res, statusCode?.NOT_AUTHORIZED, 'Email and password do not match')
    }

    // Generate a token to the session
    const token = Token.generate(user?.id, 'user')
    return Response.success(res, statusCode?.OK, { user, token }, 'You have authenticated successfully')
  }

  static async requestSignInWithPhone (res, phone, service) {
    // Find user by phone
    const user = await UserRepository.getByPhone(phone)
    if (!user) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No user with this phone exists')
    }

    // Generate the random code and send it to the user
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000)
    service === 'whatsapp' ? await twilio.sendCodeByWhatsApp(phone, code) : await twilio.sendCodeBySms(phone, code)

    // Save the code in Redis for 300 seconds (5 min)
    await redis.setex(`sign_in_code_for_user_${phone}`, 300, code)

    return Response.success(res, statusCode?.OK, null, 'Code sent successfully')
  }

  static async signInWithPhone (res, phone, code) {
    // Find user by phone
    const user = await UserRepository.getByPhone(phone)
    if (!user) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No user with this phone exists')
    }

    // Check the existence of code in Redis
    const getAsyncRedis = promisify(redis.get).bind(redis)
    const cachedCode = await getAsyncRedis(`sign_in_code_for_user_${phone}`)
    if (!cachedCode || cachedCode !== code) {
      return Response.error(res, statusCode?.PERMISSION_DENIED, 'The code is not correct or it has expired')
    }

    // Generate a token to the session
    const token = Token.generate(user?.id, 'user')
    return Response.success(res, statusCode?.OK, { user, token }, 'You have authenticated successfully')
  }

  static async requestRecoveryPassword (res, email) {
    // Find user by email
    const user = await UserRepository.getByEmail(email)
    if (!user) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No user with this email exists')
    }
    // Generate the random code
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000)
    const message = await nodemailer.sendEmail(email, 'Recovery password',
      `Your code to recovery the password is: <h2>${code}</h2>`, true)

    if (!message)
      return Response.error(res, statusCode?.SERVER_ERROR, 'An error occurred while sending the email')

    // Save the code in Redis for 300 seconds (5 min)
    await redis.setex(`recovery_password_code_for_user_${email}`, 300, code)

    return Response.success(res, statusCode?.OK, null, 'Code sent successfully')
  }

  static async recoveryPassword (res, email, code, password) {
    // Check the existence of code in Redis
    const getAsyncRedis = promisify(redis.get).bind(redis)
    const cachedCode = await getAsyncRedis(`recovery_password_code_for_user_${email}`)
    if (!cachedCode || cachedCode !== code) {
      return Response.error(res, statusCode?.PERMISSION_DENIED, 'The code is not correct or it has expired')
    }
    const user = await UserRepository.getByEmail(email)
    await UserRepository.update({ password }, user?.id)
    return Response.success(res, statusCode?.OK, { ...user.dataValues, password }, 'Password reestablished successfully')
  }

  static async refresh (res, userId) {
    const user = await UserRepository.getById(userId)
    if (!user) {
      return Response.error(res, statusCode?.NOT_FOUND, 'Client does not exist')
    }
    // Generate a token to the session
    const token = Token.generate(userId, 'user')
    return Response.success(res, statusCode?.OK, { user, token }, 'You have authenticated successfully')
  }

  static async search (res, parameter, userId) {
    const users = await UserRepository.search(parameter)
    if (users?.length === 0) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No user found')
    }
    for (const user of users) {
      const follower = await FollowerRepository.get(userId, user?.id)
      user.dataValues.is_followed_by_me = follower !== null
    }
    return Response.success(res, statusCode?.OK, users, 'Users list found')
  }

  static async getById (res, id, userId = null) {
    const user = await UserRepository.getById(id)
    if (!user) {
      return Response.error(res, statusCode?.NOT_FOUND, 'No user with this id exists')
    }
    if (userId) {
      const follower = await FollowerRepository.get(userId, id)
      user.dataValues.is_followed_by_me = follower !== null
    }
    return Response.success(res, statusCode?.OK, user, `User of id: ${id}`)
  }

  static async update (res, data, id) {
    await UserRepository.update(data, id)
    const user = await UserRepository.getById(id)
    return Response.success(res, statusCode?.OK, user, 'You have updated your user account successfully')
  }

  static async delete (res, id) {
    await UserRepository.delete(id)
    return Response.success(res, statusCode?.NO_CONTENT)
  }
}

module.exports = UserService
