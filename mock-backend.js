const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3012
const confirmation = require('./src/context/confirmation.json')
const traveller = require('./src/context/traveller.json')
const payment = require('./src/context/payment.json')
const itinerary = require('./src/context/itinerary.json')
const roundTripDomestic = require('./src/utils/mock/roundTrip.json')
const onewayDomestic = require('./src/utils/mock/roundTrip.json')
const intReturn = require('./src/utils/mock/intRt.json')
const country = [{ "k": "IN", "v": "India" }, { "k": "ID", "v": "Indonesia" }]
const fareRules = {
  "MR": "Y",
  "Refund": "Y",
  "ctc": "300.0",
  "cta": "300.0",
  "note": "Cancellation/Flight change charges are indicative. Cleartrip will stop accepting cancellation/change requests 3 hours before flight departure.",
  "ADT": {
    "BD": {
      "A": "2625.0",
      "C": "2625.0",
      "dPlusX": {
        "C": {
          "24h-365d": "2625.0"
        },
        "dplusx_note": "Cancellation/Flight change charges are indicative. If the flight is cancelled within 24 hours of departure, you will lose 100% of the fare, only the taxes will be returned."
      }
    },
    "AD": {},
    "ADNS": {},
    "BDNS": {}
  }
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/air/amend/review/:itineraryId', (req, res) => {
  console.log('Stop here')
  console.log(app)
  res.json(confirmation)
})

app.post('/air/amend/itinerary/:tripId', (req, res) => {
  res.json(itinerary)
})

app.post('/air/amend/prePayment/:tripId', (req, res) => {
  res.json(payment)
})

app.post('/air/amend/prePaymentHQ/:tripId', (req, res) => {
  res.json(payment)
})

app.get('/air/amend/travellerDetails/:tripId', (req, res) => {
  res.json(traveller)
})

app.get('/places/country_list', (req, res) => {
  res.json(country)
})

app.post('/flights/getminirule', (req, res) => {
  res.json(fareRules)
})

app.get('/workplus/user/state', (req, res) => {
  res.send("TRIAL")
})

app.post('/air/amend/search/:tripId', (req, res) => {
  console.log(req.body)
  if (req.body.isRt && !req.body.intl) {
    res.json(roundTripDomestic)
  } else if (!req.body.isRt) {
    res.json(onewayDomestic)
  } else if (req.body.isRt && req.body.intl) {
    res.json(intReturn)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))