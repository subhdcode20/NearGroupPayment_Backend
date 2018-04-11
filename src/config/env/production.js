var javaApiBaseUrl = 'https://59b2ba64.ngrok.io'
var reactClientBaseUrl = 'http://lala.neargroup.me/#'
var getCoinsDetailsJavaUrl = 'https://3d30641b.ngrok.io/NG/getCoinHistory?channelId='

export default {
  env: 'production',
  passportSecret: 'stayhungrystayfoolish',
  db: 'mongodb://localhost/my-api-production',
  port: 8088,
  MolUrlJava: javaApiBaseUrl + '/NG/molPaymentSend', //"https://14369f47.ngrok.io/NG/molPaymentSend"
  MolSuccessUrlJava: javaApiBaseUrl + '/NG/molPaymentSuccess',
  MolReturnUrl: reactClientBaseUrl + '/payment_status?referenceId=',
  getCoinsDetailsJavaUrl: getCoinsDetailsJavaUrl,
}
