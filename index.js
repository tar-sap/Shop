const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const service = require('./service');

const app = express();
const port = 3000;


app.use(express.static('views/static'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.currentUrl = req.originalUrl;
  next();
});

app.set('layout', 'default_layout')

app.set('view engine', 'ejs');

app.get('/', async (req, res, next) => {
  try {
    const shops = await service.getAllShops();
    res.render('shops', { title: 'Shops', shops: shops });
  } catch (error) {
    res.status(error.statusCode || 500).render('error', { title: 'Error', error });
  }
});

app.get('/shops/:id/products', async (req, res, next) => {
  try {
    const shopId = req.params.id;
    const shops = await service.getShopsWithProducts(shopId);
    res.render('products', { title: 'Products', shops: shops });
  } catch (error) {
    res.status(error.statusCode || 500).render('error', { title: 'Error', error });
  }
});

app.post('/createOrder', async (req, res, next) => {
  try {
    const { email, phone, name, address, coupon, products } = req.body;
    const orderData = {
      email,
      phone,
      name,
      address,
      coupon,
      products
    };

    const order = await service.createOrder(orderData);

    res.render('thankyou', { title: 'Thank you!', order: order });
  } catch (error) {
    res.status(error.statusCode || 500).render('error', { title: 'Error', error });
  }
});

app.get('/orders', async (req, res, next) => {
  try {
    res.render('orderHistory', { title: 'Orders history', orders: null, inputData: {} });
  } catch (error) {
    res.status(error.statusCode || 500).render('error', { title: 'Error', error });
  }
});

app.get('/orders/:email/:phone', async (req, res, next) => {
  try {
    const email = req.params.email;
    const phone = req.params.phone;

    const orders = await service.getOrdersByEmailAndPhone(email, phone);

    res.render('orderHistory', { title: 'Orders history', orders: orders, inputData: { email, phone } });
  } catch (error) {
    res.status(error.statusCode || 500).render('error', { title: 'Error', error });
  }
});

app.get('/orders/:transactionNumber', async (req, res, next) => {
  try {
    const transactionNumber = req.params.transactionNumber;

    const order = await service.getOrderByTransactionNumber(transactionNumber);

    res.render('orderHistory', { title: 'Orders history', orders: [order], inputData: { transactionNumber } });
  } catch (error) {
    res.status(error.statusCode || 500).render('error', { title: 'Error', error });
  }
});

app.get('/coupons', async (req, res, next) => {
  try {
    const coupons = await service.getAllCoupons();
    res.render('coupons', { title: 'Coupons', coupons: coupons });
  } catch (error) {
    res.status(error.statusCode || 500).render('error', { title: 'Error', error });
  }
});

app.get('/shoppingCart', async (req, res, next) => {
  try {
    const productIds = req.query.productIds;
    let shop = null;

    if (productIds) {
      shop = await service.getShopWithProductsByIds(productIds);
      if (!shop) {
        const error = new Error('Invalid product IDs');
        error.statusCode = 400;
        throw error;
      }
    }

    res.render('shoppingCart', { title: 'Shopping Cart', shop: shop });
  } catch (error) {
    res.status(error.statusCode || 500).render('error', { title: 'Error', error });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port: ${port}`);
});