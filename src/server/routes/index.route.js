import express from 'express'
import userRoutes from './user/user.route'
import authRoutes from './auth/auth.route'
import molPayRoutes from './molPay/molPay.route'

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

// define api routes
router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/mol', molPayRoutes)

export default router
