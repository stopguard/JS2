const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
const dirStatic = '../public';

app.use(bodyParser.json());
app.use(express.static(dirStatic));

app.get('/catalog', (req, res) => {
  fs.readFile('db/catalog.json', 'utf-8', (err, data) => {
    // лень переписывать обработку запросов на клиентской стороне поэтому так
    let products = JSON.parse(data);
    let result = [];
    for (let [id, el] of Object.entries(products)) {
      el.id_product = id;
      result.push(el);
    }
    res.send(result);
  });
});

app.get('/cart', (req, res) => {
  fs.readFile('db/cart.json', 'utf-8', (err, data) => {
    // лень переписывать обработку запросов на клиентской стороне поэтому так
    let cart = JSON.parse(data);
    let products = fs.readFileSync('db/catalog.json', { encoding: 'utf-8' });
    products = JSON.parse(products);
    let result = {
      amount: 0,
      countGoods: 0,
      contents: [],
    };
    for (let [id, count] of Object.entries(cart)) {
      let cartItem = {
        id_product: id,
        product_name: products[id].product_name,
        price: products[id].price,
        quantity: count
      }
      result.amount += cartItem.price * count;
      result.countGoods += count;
      result.contents.push(cartItem);
    }
    res.send(result);
  });
});

app.post('/add', (req, res) => {
  fs.readFile('db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(`error: ${err}`);
      res.send({ result: 0 });
    } else {
      let products = fs.readFileSync('db/catalog.json', { encoding: 'utf-8' });
      products = JSON.parse(products);
      let cart = JSON.parse(data);
      let item_id = req.body.id;
      if (products[item_id]) {
        if (!cart[item_id]) {
          cart[item_id] = 0;
        }
        cart[item_id] += 1;

        fs.writeFile('db/cart.json', JSON.stringify(cart), (err) => {
          if (err) {
            console.log(`error: ${err}`);
            res.send({ result: 0 });
          } else {
            console.log('done');
            let logger = fs.readFileSync('db/stats.json', { encoding: 'utf-8' });
            logger = JSON.parse(logger);
            logger.push({
              action: 'add',
              product: products[item_id].product_name,
              time: new Date().toString(),
            });
            fs.writeFile('db/stats.json', JSON.stringify(logger), (err) => {
              if (err) {
                console.log('log write is failed');
              }
            });
            res.send({ result: 1 });
          }
        });
      } else {
        console.log(`error: product is not found`);
        res.send({ result: 0 });
      }
    }
  });
});

app.delete('/del', (req, res) => {
  fs.readFile('db/cart.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(`error: ${err}`);
      res.send({ result: 0 });
    } else {
      let cart = JSON.parse(data);
      let item_id = req.body.id;

      if (cart[item_id]) {
        cart[item_id] -= 1;
        if (!cart[item_id]) {
          delete cart[item_id];
        }

        fs.writeFile('db/cart.json', JSON.stringify(cart), (err) => {
          if (err) {
            console.log(`error: ${err}`);
            res.send({ result: 0 });
          } else {
            console.log('done');
            let products = fs.readFileSync('db/catalog.json', { encoding: 'utf-8' });
            products = JSON.parse(products);
            let logger = fs.readFileSync('db/stats.json', { encoding: 'utf-8' });
            logger = JSON.parse(logger);
            logger.push({
              action: 'del',
              product: products[item_id].product_name,
              time: new Date().toString(),
            });
            fs.writeFile('db/stats.json', JSON.stringify(logger), (err) => {
              if (err) {
                console.log('log write is failed');
              }
            });
            res.send({ result: 1 });
          }
        });
      } else {
        console.log(`error: product is not found`);
        res.send({ result: 0 });
      }
    }
  });
});

app.listen(port, function () {
  console.log(`server on port ${port}`);
});
