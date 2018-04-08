var javaApiBaseUrl = 'https://7ca200ab.ngrok.io'
var reactClientBaseUrl = 'https://lala.neargroup.me/#'
var getCoinsDetailsJavaUrl = 'https://09c3112c.ngrok.io/NG/getCoinHistory?channelId='

export default {
  env: 'production',
  passportSecret: 'stayhungrystayfoolish',
  db: 'mongodb://localhost/my-api-production',
  port: 8080,
  MolUrlJava: javaApiBaseUrl + '/NG/molPaymentSend', //"https://14369f47.ngrok.io/NG/molPaymentSend"
  MolSuccessUrlJava: javaApiBaseUrl + '/NG/molPaymentSuccess',
  MolReturnUrl: reactClientBaseUrl + '/payment_status?referenceId=',
  getCoinsDetailsJavaUrl: getCoinsDetailsJavaUrl,
}
