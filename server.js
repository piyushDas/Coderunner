const express = require('express')

const app = express()

const proxy = require('http-proxy-middleware')

const cors = require('cors')

// const expressWinston = require("express-winston");
// const winston = require("winston"); // for transports.Console

const serverConfig = require('./config/server.config.dev')

//Get the authtoken from ct-auth cookie
let authToken = 'p7viJ4DqY6MphuzgJ7g%2BED7F5FLxDMa%2B07WufcHuYmC5YSQLVW5s073YUfw%2BPHFPrq5YgXrvxLv0Y8mDaNpF2lcZjMqQO%2Fwh8FYIbEySH8M%2FmyTtreW9tfQaeGMaJK25A9hW47z9zW712k%2BFDiEGxpelXEhOK%2FcHrBg8lLmoDQIZKhk6lSEI8Xjj4jv%2FJiMh4cwfn3BFWXn7%2B9cGTs%2BkZ2ddzwlqkaASKHDx4oSYcrCN2wKgBvO1wl%2BLLpuZTvvryzj1etO3mDQYEwu4jc5yRILqUoKVcl3QMDPUo2ch6fGhUyyf9%2FuutM%2FcmiD2ti02MwPyVe58Eiuo%2FgQqIRWQiQsIP06vlSTq1INQKuHWedx1TQeXrJ494xXhpFaep%2FV4aAiA8P3cxg%2B9zeFQyuQvvw8ibk29h8ZmI3%2FLGxcladAfgeZCVMQSu1NVR8SnX%2FQKs6eLMy3O4HirmRtMvz1NyVSdEnvqOmveHQ92ALF1m8WVzJSkq5YQoMGVe0NRNr1GeQbQyQpyVJ6RLU0pdSxHvJa%2F0ygmzEItxzgWm5bwTXKCHDQwvPkqIp7Id%2BoQfsOm'
// let authToken = 'wYYelWDlrfg1hOufSVlX8MpLXrbcv%2FRgJWSfgs3NnR50oZ%2BmZAxWnlhZMgkBdsPMe5SwZu6R5I7YBJpqTQZh%2FeFQ5KXyrvPo7zzAkFZQ0nIReKImQAiCNq1VB1QCpkTwz24NJKlNxQXHLapH%2BEk93fXqtPQv6FLMAIJeMalgyUQvq6cGdkss5y%2FYMgzO17%2BiYOqTMWTl%2BUHIIKUxqyoyx75OTJ01KA9t3M0UuWZw2ZxToiRzXOGbdyiLMG2woiwTLC51fqUlTW63eXNDMzqY6uJdqVNSPoS0TYnpBFh%2B%2Fv8%3D'
// let authToken = 'vNKZcb6wsIBou55K4DR7iHa1%2BKmL18RqSFfA%2B1yDpHSOok4722xlT3ufv7PJGCBudHzTT6XdGJrmUM5ycV22oub6PIOp9LeMAmWmpHEq1nXbut5%2FTZL5ydtILdAXNnUfKQ25Oq4y%2BYb6rnClxu66WKLZiTdEKkjaPw9yA3jLrcBFPadDhADcu2tIIJKys%2BN5GaqX5VlxYlpbj60QRwfgD9%2BbotR8VhQRNZsocGlIYBOsREV%2Bgk7i%2BsLyHHvOoLlWigT%2FRuA2sldEPaXYwS%2FLuccxTK4Js5b3%2BYQs%2FxoSrzpmS16kH2fz%2BTmE5j4miA3%2FxtULLPwFin4hOTCqCaJMPJNErX3m9tZvweddN1V9ujTErCe%2F1xt96We1x51tDh83Mi5kXiFMmxztkRjxJBbU%2F1%2B0quZtsNu0HNSJSefw5g3czcCfEcamZnIMbRDcRDgjY0Yi1d94l9%2FB7eAZwz0XjkUWi8bpGV0MjNpekisj6%2FWpJ9IVfSiYnONxd3m4nvUkZqcDLXsdvDEctwwqHXZaLhjq5tM85%2F9xko8e59lvSa%2Fgozbdl246BKQ%2FiBrobUXRUYsDP3yhI8W65Rs65h%2BiCaqLJL9eMJK4Fo2IfqLTN8xaafS49JRdH4nSjdxDZv1Uz2xD27b1S8QcdIj9oyB2pfCdPuscfaHijivXWhezDfKp3CRbLFUiwJMLX5o0Oxx37UWiDoaaAIj2yAwbiLGILS%2BcxNpAdiQUV%2BXb0hHkJN6IMx4FFE28gvq5dzfOdVBycq8Y6d2A7zacaY95NbepVk3XyRkuixOQOpwllHlo1bLQQEV9E6vuxD8ZNtUOxhMjzSNWidrnmpMRp2Cc3rnGxqso3Vx9YETgLnQgHqG3Vfx8%2BUNvvnRX%2Bhf3%2FDL4PJUdS9r1DkadFHM6mmkHQI78VG0bE0Y38oct9VPprGABeEJu5TbkiKvomWrk6EYk9umQ3wNdNqsofHckHPBCLNMh%2BIJCv6yAseB3ObeldP%2FhImNgP9PGmxEa81Fz1%2BHQguMZWLfjM1jmDCo03nvJokOAR8xBHhCOYHkcqF3etZ%2FAHD3WZG1RF1NXr2CdZBW3klLFUzFq5a8OyqY6J83eKcrC4RzFrAldWlxLrFULsPb1gcm4HPpmK7X32kRQGO%2BJNd7aM4asUZiln%2BvbPEsYdpIgw6o%2B0jDYi68Z7hMLPhZbQxlkGKXBSQ7C74arZc5AU%2BUwD7Wi9E0GZ1XLkoFwN4bqCUYc3EqXl1nX1AlEnHPr19Ci92wYh4gD%2BNDIq3bbvljQ2rmp%2Bl2VodpgqzeMXzjKM9JdLUd80p%2FHWUWXITraufjdAbzGkiOy4yUKRniQaacHpE0TdYgtfqEYda%2Ftrjf59x9bt9CrJ9cVk3l9lfz7iHrf4jd4hmKrQS0dyCG2%2BCr885coNGQIwb8VIHR8jm0ppVp5Wtjdf%2FJ%2BvubTSjpS5qIRZnLo1zrcDKYzkn7%2F0k2tvAa8LhF0yAb8hjk5YlqbVVUdmtzZQgMqwimcEuiG7mslE3UQvAhs54onaEZJsAcx%2BbwR5gBTolVbOYVRY5GB6%2FygsPCkHZu2qK47xE3K09R3tQ4Q8O9R%2FyGO6XBsKJjwHpmXUxkTkrjvFB9RhPWVrX0I0OLndzLkMqh5dWkx3wjH%2FnKrgsdt%2FbcOn00%2BsJYlOL7GiI5k%2F9FfAm%2BieVUC0hugYuDU7Xidiv20B1V8rSae6ryhL%2BNoHlYwkSeqRP67dh4DO7NaUWl%2BHfySO55XQJoXCm0wm8LFvjQx7cAIfwIVk6pna4LUG%2BOl1X0K4HePm98oZFAh4vv2SuQHiQnoWikzylNlxns2Zg8hRmhIr292iiYVyFJakhnOQRknhk8exWGePwmAvQb2l9K3pRKlyT0J0jj4MUhTIPfVXGTQ4AQdqPYvTSEljEc52P2dVVfhw2nCYXjCwjrbC9e5XfRJH%2FL2EiwShX%2FznsYrUFcPXUr7Z2exREfSPs2Z55t910u6m3KGLxAnmk1cEB7OMrK%2BkjYBCMuzTNi3WWwYI0TQ%2FpMIgScukiphjajGoHCgIau246Dy%2FpSesZx%2BDQ6gsA%2B3McA%2BuQaVUxLdcFiDic2kRLJiw0Lu%2Bhmntgq2nzQDw%2FJcZNFhsMbn1M8tOfoxDhjA3KSxGBcuQQ1KKSuwjyT0ZewayuxFWQy5MzeUhnkiRRt0lVvfR6Wn9QkEeRKOMVB2mYXqEfrcDDCqRby%2B3EE9MR3rTxOvRVQhPrlhag9RDnln3Deb2J6fpoPDtHDbOa56R1r4i1%2BstEIodrXyWaIerOzwuq6VqKyBmK7n74bRP0LbYvL2oEk4xCC3mlRg2fW9I1o4nGM4EbW8Kib1hPrULG4F5hicFIZMuO1xi3aQ3arbKVJWjL4bZ7Id9sFu4Zuseujw%2FuOgcqh8cFfQqzS7BbGvYubhy1kBPC54iUsp5E6zTVJlBbKVrRmyqEYK0ctHT%2FqtfkCrh%2F8ZC5rfhK2Ko08d9KPcmBtX4Z23%2BYywRRd7hMuEVJbujDu9pK2qdV%2FjuJcalCDGoINm65Im9MmsoDKuKncHpHB6ml2X%2B%2FSe%2FL3J1lfYdKUbT2OOIxZ4tq4qnQU82t8EuoQk0ZY%2FowudVlZ6Fi5uM1QtFGVLv3Zhy9xuOlSmI7X3cj%2Fe0%2BkZ%2FYh%2B89ODaYk73q3kurPK6etaXNrD3j4G8W%2BODIfDRWn6sWEag1WvkdlLFthKFHIh6PTiMmoFZdw2odCukgGeEKH4PGuazMTTiGHN55Iiq94X05DUgwn3DvZqJdxWIdiwgqs1wRMl09sXucyTy3KK3mElhiY%3D'
// let authToken = 'lSlcCb72uvSNeYKN7NfiGrln%2F%2Bythg83oLRtJivX%2FhDVtbxWMdztR5hev4hCg6R4HzaALAJufITOecsYAhx%2BJNWKFqckmb9RR9I288QBDrelpQpqSj8nKJlbFUpIA7ZLyiVaAXZJPwEEUma8fNkEeg3bwFa4iGUsH5jG5MgEpu%2BJVBfpCpACiSFBrP0%2BskWz'
// authToken = 'ypwiMgEEkHUFBx6PdQeQA5woTpQYnUaLD7CmyFsgwUkIrrsap%2BppgE0QwB0F7fakK2ny1G%2FqvsF8BflsbZdXn%2Bi7MU3Mtv1H4Lv5Rz9JRIb9U8t9sZgF9DQiJRtMThd6vrpx3EcElSt8IxAixuU3WxK5D9urHDXNg%2FNXfZv9AxdFwJ%2BJprXRYpKa9xCC%2B1mRouYI8oKaD20q1fliLK9Mv1t7BDQxkTeTg267Hz%2FkRRiqfNVue4UWyh4voPMBhhlwyVBoGaDFCyW0Iyu6pgIDJ2vU7RpLLmz6Pvu3BYd%2B3w30ZJw2RydMEALKu9EyRkvlHPElnGeVKuRnIUwa1tHmdUJoPbX%2BXv1dXA2c%2B%2FyvahOOpUR7NXqobOaMTZdi7AIE9RUswk8D6pF4ptuK5J5L2Lneawpba5X6nFGlBJthHl82AQjLs0zYt1lsGCNE0P6TfL0fanMPD8tB9QlMxKF3ir6nA0y%2Bsq90FCu%2FkLxbxX0Y6ubTPOf%2FcZKPHufZb0mvAfJcEZuItG8O5jh2q8wPKyqCSj0wJU8LrJyF%2BjbBQoeRl5BhCmyFD6tFpGedIx11nS5FzhQeBYUYtpVa0NsgGIUDypGWFuH5MUFMtzsNt4OrFO0poKFvxpDHSrlqZI%2FcWUGO6HbOXTJ9WV2%2B0FDZIkk4ZO908pn5g75yu45QBcLCySE07eweB%2F1uc210L7Pi%2BYlI9qNakUJSbRei7ZlBuyRgsZdD4Y%2BE%2BB7oUjFVn7ZNkUKq7sGdCJ2CwSrfOh779c7%2BhLptSbkvmDWjGI8hd%2Bu9IBU8MClGyJN9pXuvz7bxGOaUBdBXLOaumXl6gIleb76K%2FDsxbAu3%2FWzTEgkxOmol6Wv7SY8RMcS1Ujr4u9wEILKTKt5z3thV7812uosJ7t19ARaybDXNnLWfXVyxxtn%2BBLespqbTjVBkgNF06hu8GjEhwqGEq7MBzYK8v7ATU9jfmCLhTmDyp5l9s%2BT%2Bh8w5ktiHp0VwDuA8k0z%2BPfHQngNCN52s4atc8FHa86uz0WFtVRfSAv4hF7NUghcchkLOwFjJpDSq73LZsXYmpa1kArqIp%2FwFor6tLbX54ydn3z8unbyxv7GOM278j9pEHh%2FfX%2FSiqPGoKUAfb5kptL%2FKfhzxKtfwvqdzjDiP1RZmnB1XEwdF2%2BmSxf9AzIF2ibuT3TqUQza5b6dOPELIf0hSRlpX3u41UaN5brj9x7M1mDNmBmcKdd12LRsogzQizYC%2BhJNw7VVcp5LEguU0s2ljVWAEfa3ESzi2cImloO2Q5kVb88crVbmFXAilpTXzjLU%2FQbRGVC8RI2EoWZ44Dth38rgkZoMfo49gbgFutgr7neduCQjHkTeu5xRL28J9kV9qNidFhBzwX6jLH9IPNmknN%2FYyvgaZb%2FkFNkla8Gs2Nzh8PBVI4OAGMomBldH7DwOajMxHQv1uW0BwA2t8Z%2F6PzU%2B6xqAksSnS6rdXaQRtu%2BQ%2Fs87NS9poeEOik4l2JHKgEvGBHqtoN9U5JrA%2FUp976fq1nvWGtJJixrEldevy9dnmoMukymyyRH76P57Caxdx%2B1jj3IY%2FSES2WSfG8j%2FQMhv370qSzRStid0IKUvqfaI0kx68uAvr8m7miUs7vej8frHzeZL%2BKQtvsQVDNqITmFNJmieZNpwMNFeygJgcU55QKDOUQzfMyOb9t7zuwTkAaiAlKO1UT8WlHBbviQ0ZFYvPiSux3odX%2BtwLRcTD%2FTYNO0dnwnyC9Oj2boWdcomWHki%2BFmsQnjQ7NevUhCzJA7lHQrirBkfjBQK4yqNGrL240O%2BGB5bK1NbnyhcBGb6Md7nSJCeVa%2FetBoqG76eF7oadFLJY5njTL23T7u5CZfPNel8SQMDzNmq7RO31ALUmTvwE2CG%2Bbi7rDHgTPC938SioQmO868UM10KpAjW6NvKJ5O6d%2FvHVYWRBarsWg9xj07TR7W7a0UGg%2BAA0kiB05a7cQ1CI1sVkc%2BcIgEpVwbsesxM2wnnKja0XNw8tAMhjC9GH9IP4Z6QaI2BUQ3ACVCuUR73LFU3sIUgMhE5tgIIEXyyANBxTOVqi%2FCoyvNlKg4W6eSdz%2B3vScqWRfVPFbeOgftPAlJLtWE8Ou6JluE5f64GZNrQ9KlBx2L88bSaDOu9SlGpq4pYTtoSKuE863%2F0a%2Fc8zTxUAAIDMYc6qVBfQ84%2FMhi76PgzjpJl6irV74tkBY19M8tTY2t%2BeJJCAa6l%2Fyiq2dgFBkJJkyXyaPALMaZhEpb0TPKzKX9GYYRt19sZQyCRZ3cHOU%2BtgwU8%3D'
const OTP_flow = false
const proxyOptions = {
  target: serverConfig.PROXY, // target host
  changeOrigin: true, // needed for virtual hosted sites
  logLevel: 'debug',
  autoRewrite: true,
  protocolRewrite: 'http',
  onProxyReq: (proxyReq, req, res) => {
    if (OTP_flow) {
      proxyReq.setHeader(
        'Cookie',
        'ct.html5.capable=true; ct-auth-no-login=' + authToken + '; Path=/'
      )
    } else {
      proxyReq.setHeader(
        'Cookie',
        'ct.html5.capable=true; ct-auth=' + authToken + '; Path=/'
      )
    }
  }
}

// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console({
//       json: true,
//       colorize: true
//     })
//   ]
// }));
app.use(cors())
const gatewayProxy = proxy(
  [
    '/air/amend/search/',
    '/air/amend/travellerDetails/',
    '/flights/freeBaggageInfo',
    '/air/amend/itinerary/',
    '/flights/getminirule'
  ],
  proxyOptions
)
app.use(gatewayProxy)

// app.get('/m/pwa/health-check', (request, response) => {
//   return response.status(200).send('200 OK')
// })

app.listen(serverConfig.PORT, serverConfig.HOST, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://${serverConfig.HOST}:${serverConfig.PORT}`)

})
