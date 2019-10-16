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

app.get('/api/change', (req, res) => {

  const nameDrag = req.query.nameItemDrag;
  const nameDrop = req.query.nameItemDrop;
  var objDrag = _.find(recipes, { [nameDrag]: {} }); //obj có key là nguyên tố đang kéo ra
  var objDrop = _.find(recipes, { [nameDrop]: {} }); ////obj có key là nguyên tố bị thả vào
  if (_.has(objDrag, [nameDrag, nameDrop]) === true) {
    e = _.findIndex(elements, function (o) { return o.name === objDrag[nameDrag][nameDrop]; });
  }
  if (_.has(objDrag, [nameDrag, nameDrop]) === false) {
    e = _.findIndex(elements, function (o) { return o.name === objDrop[nameDrop][nameDrag] });
  }
  if (e != -1) {
    if (req.query.idDrop < 4) {
      objData.Items = _.concat(objData.Items,
        {
          id: objData.Items.length,
          name: elements[e].name,
          url: elements[e].url,
        });
      objData.Target = _.concat(objData.Target,
        {
          id: objData.Target.length,
          name: elements[e].name,
          url: elements[e].url,
          recipe: objData.Items[req.query.idDrag].name + '+' + objData.Target[req.query.idDrop].name
        })
    }
    else {
      objData.Items = _.concat(objData.Items,
        {
          id: objData.Items.length,
          name: elements[e].name,
          url: elements[e].url,
        });
      _.fill(objData.Target,
        {
          id: req.query.idDrop,
          name: elements[e].name,
          url: elements[e].url,
          recipe: objData.Items[req.query.idDrag].name + '+' + objData.Target[req.query.idDrop].name
        }
        , req.query.idDrop, req.query.idDrop + 1)
    }
    const ids = new Set();
    const newItems = objData.Items.filter(e => {
      if (ids.has(e.name)) {
        return false;
      } else {
        ids.add(e.name);
        return true;
      }
    });
    objData.Items = newItems;
    res.json(objData)
  }
})
app.post('/api/change/create', (req, res) => {
  objData.Items = _.concat(objData.Items,
    {
      id: objData.Items.length,
      name: req.body.name,
      url: req.body.url,
    });

  const ids = new Set();
  const newItems = objData.Items.filter(e => {
    if (ids.has(e.name)) {
      return false;
    } else {
      ids.add(e.name);
      return true;
    }
  });
  objData.Items = newItems;

  res.json(objData)
})

app.delete('/api/change/delete', (req, res) => {

  _.forEach(objData.Items, (item, index) => {
    if (index > req.query.id) {
      item.id = item.id -1;
    }
  });

  _.remove(objData.Items, function (item) {
    return item.name === req.query.name;
  });

  res.json(objData)
})

app.patch('/api/change/change', (req, res) => {

  _.fill(objData.Items,
    {
      id: req.body.id,
      name: req.body.name,
      url: req.body.url,
    }
    , req.body.id, req.body.id + 1)

  res.json(objData)
})

app.listen(5000, () => {
  console.log('App listening on port 5000')
})