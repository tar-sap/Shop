const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql7.freemysqlhosting.net',
  user: 'sql7621893',
  password: 'wKrejdEh4j',
  database: 'sql7621893'
});

function query(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function getAllShops() {
  return await query('SELECT * FROM shops');
}

async function getShopsWithProducts(shopId) {
  const shops = await query('SELECT * FROM shops');
  shops.products = await query('SELECT * FROM products WHERE shop_id = ?', [shopId]);
  
  return shops;
}

async function getShopWithProductsByIds(productsIds) {
  const products = await query('SELECT * FROM products WHERE id IN (?)', [productsIds]);

  if (products) {
    const shop = await query('SELECT * FROM shops WHERE id = ?', products[0].shop_id);
    shop.products = products;

    return shop;
  }

  return null;
}

async function getCouponByCode(couponCode) {
  return (await query('SELECT * FROM coupons WHERE code = ? LIMIT 1', [couponCode]))[0];
}

async function getAllCoupons() {
  return await query('SELECT * FROM coupons');
}

async function getOrdersByEmailAndPhone(email, phone) {
  const orderHistory = await query('SELECT * FROM OrderHistory WHERE email = ? AND phone = ?', [email, phone]);
  const transactionNumbers = orderHistory.map(order => order.transaction_number);

  const orders = await Promise.all(transactionNumbers.map(transactionNumber => getOrderByTransactionNumber(transactionNumber)));

  return orders;
}

async function getOrderByTransactionNumber(transactionNumber) {
  const orderHistory = await query('SELECT * FROM OrderHistory WHERE transaction_number = ?', [transactionNumber]);
  const orderProducts = await query('SELECT * FROM OrderProducts WHERE transaction_number = ?', [transactionNumber]);

  const order = orderHistory[0];
  const productsIds = orderProducts.map(op => op.product_id);

  const shop = await getShopWithProductsByIds(productsIds);

  const productsWithQuantity = shop.products.map(product => {
    const quantity = productsIds.filter(pId => pId == product.id).length;
    return { ...product, quantity };
  });

  shop.products = productsWithQuantity;
  order.shop = shop;

  if(order.coupon)
    order.coupon = await getCouponByCode(order.coupon);

  return order;
}

async function createOrder(email, phone, name, address, coupon, order_price, product_ids) {
  const insertOrderSql =
    'INSERT INTO OrderHistory (email, phone, name, address, coupon, order_price) VALUES (?, ?, ?, ?, ?, ?)';
  const insertOrderValues = [email, phone, name, address, coupon, order_price];
  const { insertId: transactionNumber } = await query(insertOrderSql, insertOrderValues);

  const insertOrderProductsSql = 'INSERT INTO OrderProducts (transaction_number, product_id) VALUES ?';
  const insertOrderProductsValues = product_ids.map((product_id) => [transactionNumber, product_id]);

  await query(insertOrderProductsSql, [insertOrderProductsValues]);

  return await getOrderByTransactionNumber(transactionNumber);
}

module.exports = {
  getAllShops,
  getShopsWithProducts,
  getCouponByCode,
  getAllCoupons,
  getOrdersByEmailAndPhone,
  getOrderByTransactionNumber,
  createOrder,
  getShopWithProductsByIds
};