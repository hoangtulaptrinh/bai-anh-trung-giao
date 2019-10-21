const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const _ = require('lodash')
var objData = require('./data/objData')
var recipes = require('./data/recipes')
var elements = require('./data/newElements')
var originObjData = require('./data/originObjData')

app.get('/', (req, res) => {
  res.send('hello from server!')
})
//gửi danh sách các nguyên tố ban đầu sang bên front-end
app.get('/api/getdata', (req, res) => {
  res.json(objData)
})

app.get('/api/getnewitem', (req, res) => {
  var idDrop = Number(req.query.idDrop);
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
    var newItemsObj = {
      id: objData.Items.length,
      name: elements[e].name,
      url: elements[e].url,
    }
    if (idDrop < 4) {
      objData.Items = _.concat(objData.Items, newItemsObj);
      objData.Target = _.concat(objData.Target,
        {
          id: objData.Target.length,
          name: elements[e].name,
          url: elements[e].url,
          recipe: objData.Items[req.query.idDrag].name + '+' + objData.Target[idDrop].name
        })
    }
    else {
      objData.Items = _.concat(objData.Items, newItemsObj);
      _.fill(objData.Target,
        {
          id: idDrop,
          name: elements[e].name,
          url: elements[e].url,
          recipe: objData.Items[req.query.idDrag].name + '+' + objData.Target[idDrop].name
        }
        , idDrop, idDrop + 1)
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
app.post('/api/createitem', (req, res) => {
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
  //trừ id của từng item đi 1 kể từ item bị xóa để code hoạt động bình thường
  _.forEach(objData.Items, (item, index) => { 
    if (index > req.query.id) {
      item.id = item.id - 1;
    }
  });
  //xóa bỏ item cần xóa
  _.remove(objData.Items, function (item) {
    return item.name === req.query.name;
  });

  res.json(objData)

})

app.patch('/api/changeitem', (req, res) => {

  _.fill(objData.Items,
    {
      id: req.body.id,
      name: req.body.name,
      url: req.body.url,
    }
    , req.body.id, req.body.id + 1)

  res.json(objData)
})

app.get('/api/change/reset', (req, res) => {
  objData.Target = originObjData.Target;
  res.json(objData)
})

app.get('/api/change/hardreset', (req, res) => {
  objData.Items = originObjData.Items;
  objData.Target = originObjData.Target;
  res.json(objData)
})

app.listen(5000, () => {
  console.log('App listening on port 5000')
})