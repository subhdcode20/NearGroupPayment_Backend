import axios from 'axios'
import config from '../../config/env'
import md5 from 'md5'
var jwt = require('jsonwebtoken')

var qs = require('querystring')
var http = require('https')
var MolUrlJava = config.MolUrlJava //"https://c7e02dfa.ngrok.io/NG/molPaymentSend"
var MolSuccessUrlJava = config.MolSuccessUrlJava //"https://c7e02dfa.ngrok.io/NG/molPaymentSuccess"

/**
 * get MolPay payment url
 */

var applicationCode = '0xvon0HvIZlmyc2P0WY5QTmH5gncMqPu'
var version = 'v1'
var description = 'NearGroup payment'
var Secret_Key = 'xcaLKxZafwIJd1zmxtv5nqJZ5GK1gNmR'

function molPayPaymentRequest(req, res) {
  var customerId = req.body.chauth
  var channelId = req.body.chid
  var referenceId = 'TRX' + Date.now()
  console.log('got channelId=', channelId)
  // var returnUrl = "https://f07932ef.ngrok.io/mol/molpaymentsuccess?referenceId=" + referenceId
  var returnUrl = config.MolReturnUrl + referenceId //"https://543f9613.ngrok.io/payment_status?referenceId=" + referenceId
  console.log('returnUrl for signature=', returnUrl)
  var Signature = applicationCode + customerId + description + referenceId + returnUrl + version + Secret_Key
  console.log('signature raw=', Signature)
  Signature = md5(Signature)
  console.log('signature final=', Signature)
  // returnUrl += "&signature=" + Signature

  console.log('returnUrl final=', returnUrl)

  var body = {
    // applicationCode: applicationCode,
    referenceId: referenceId,
    // version: version,
    returnUrl: returnUrl,
    description: description,
    chid: customerId,
    channelId: channelId,
    signature: Signature,
    paymentType: req.body.paymentType,
  }

  // var token = jwt.sign({referenceId: referenceId,customerId: customerId,signature: Signature }, 'shhhhh_neargroup_payment');
  // console.log('pay req body=', body, "TOKEN: ", token);

  // body = req.body
  global.test = 'testtt'
  global.applicationCode = applicationCode
  global.referenceId = referenceId
  global.version = version
  global.returnUrl = returnUrl
  global.description = description
  global.customerId = customerId
  global.signature = Signature
  global.channelId = channelId

  console.log('channelId in payment req=', global.channelId)

  axios
    .post(MolUrlJava, body, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      console.log('mol api response = ', response.data)
      // if(response.status == 200) {
      // console.log('mol response success');
      // let {paymentUrl} = response.data
      // that.setState({paymentUrl: paymentUrl}, () => {
      //   console.log('paymentUrl set=', this.state.paymentUrl);
      // })
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.status(200).send(response.data)

      // } else {

      //   console.log('mol response error');

      // }
    })
    .catch(e => {
      console.log('mol payment request error ', e)
      res.status(500).send('error')
    })
}

function molPaymentSuccess(req, res) {
  // console.log("global = ", global);
  var body = {
    applicationCode: global.applicationCode,
    referenceId: global.referenceId,
    version: global.version,
    returnUrl: global.returnUrl,
    description: global.description,
    customerId: global.customerId,
    signature: global.signature,
    channelId: global.channelId,
  }
  console.log('global test=', body)
  // var returnUrl = window.location

  var rawSignature =
    global.applicationCode +
    global.customerId +
    global.description +
    global.referenceId +
    global.returnUrl +
    global.version +
    Secret_Key

  var Signature = md5(rawSignature)

  console.log('Signature=', Signature)

  rawSignature = global.applicationCode + global.referenceId + global.version + Secret_Key

  Signature = md5(rawSignature)
  body['signature'] = Signature
  console.log('Signature with less params=', Signature)
  // var decoded = jwt.verify(req.query.token, 'shhhhh_neargroup_payment');
  // console.log('decoded=', decoded);

  axios
    .post(MolSuccessUrlJava, body, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      console.log('mol SUCCESS api response = ', response.data)
      // if(response.status == 200) {
      // console.log('mol response success');
      // let {paymentUrl} = response.data
      // that.setState({paymentUrl: paymentUrl}, () => {
      //   console.log('paymentUrl set=', this.state.paymentUrl);
      // })
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.status(200).send(response.data)

      // } else {

      //   console.log('mol response error');

      // }
    })
    .catch(e => {
      console.log('mol payment request error ', e)
      res.status(500).send('error')
    })

  // res.status(200).send("success")
}

function getUserCoinsDetails(req, res) {
  let customerId = req.query.customerId
  global.customerId = customerId
  console.log('customerId = ', customerId)

  let getCoinsDetailsUrl = config.getCoinsDetailsJavaUrl + customerId //"d65ac649d9f54ed1853c1bd3ddd0e693"   //"https://06489a03.ngrok.io/NG/getCoinHistory?channelId=" + customerId
  console.log('getCoinsDetailsUrl= ', getCoinsDetailsUrl)
  try {
    axios
      .get(getCoinsDetailsUrl)
      .then(response => {
        // that.setState({loading: false}, () => {
        //   console.log('loading removed ', this.state);
        // })
        console.log('mol get coin details response = ', response.data)

        if (response.data['Grant Access']) {
          global.channelId = response.data.channelId
          global.totalCoins = response.data.totalCoins
          console.log('get coins success')
          let coinsDetails = JSON.parse(response.data.data)
          console.log('coinsDetails= ', coinsDetails)
          response.data['coinsDetails'] = coinsDetails
        }
        res.status(200).send(response.data)
      })
      .catch(e => {
        console.log('mol get coins details error ', e)
        res.status(500).send('error')
      })
  } catch (e) {
    console.log('try catch error= ', e)
    res.status(500).send(e)
  }
}

export default { molPayPaymentRequest, molPaymentSuccess, getUserCoinsDetails }
