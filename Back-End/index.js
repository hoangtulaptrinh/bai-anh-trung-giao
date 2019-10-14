const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const _ = require('lodash')
const objData = require('./data/objData')
const recipes = require('./data/recipes')
const elements = require('./data/newElements')

app.get('/', (req, res) => {
  res.send('hello from server!')
})
//gửi danh sách các nguyên tố ban đầu sang bên front-end
app.get('/api/getdata', (req, res) => {
  res.json(objData)
})

app.post('/api/change', (req, res) => {
  const nameDrag = req.body.nameItemDrag;
  const nameDrop = req.body.nameItemDrop;
  var objDrag = _.find(recipes, { [nameDrag]: {} }); //obj có key là nguyên tố đang kéo ra
  var objDrop = _.find(recipes, { [nameDrop]: {} }); ////obj có key là nguyên tố bị thả vào
  if (_.has(objDrag, [nameDrag, nameDrop]) === true) {
    e = _.findIndex(elements, function (o) { return o.name === objDrag[nameDrag][nameDrop]; });
  }
  if (_.has(objDrag, [nameDrag, nameDrop]) === false) {
    e = _.findIndex(elements, function (o) { return o.name === objDrop[nameDrop][nameDrag] });
  }
  if (e != -1) {
    res.send({
      name: elements[e].name,
      url: elements[e].url,
    })
  }

})

app.listen(5000, () => {
  console.log('App listening on port 5000')
})