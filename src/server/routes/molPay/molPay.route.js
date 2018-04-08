import express from 'express'
import molCtrl from '../../controllers/molPay.controller'

const router = express.Router() // eslint-disable-line new-cap

// router.route('/') /** GET /api/users - Get list of users */.get(userCtrl.list)

router.route('/molpaymentrequest').post(molCtrl.molPayPaymentRequest)

router.route('/molpaymentsuccess').get(molCtrl.molPaymentSuccess)

router.route('/usercoinsdetails').get(molCtrl.getUserCoinsDetails)

/** Load user when API with userId route parameter is hit */
// router.param('userId', userCtrl.load) - might not need this anymore because of cookies

export default router
