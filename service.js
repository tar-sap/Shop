const db = require('./db');

async function getAllShops() {
  return await db.getAllShops();
}

async function getShopsWithProducts(shopId) {
  return await db.getShopsWithProducts(shopId);
}

async function getShopWithProductsByIds(productsIds) {
  return await db.getShopWithProductsByIds(productsIds);
}

async function getAllCoupons() {
  return await db.getAllCoupons();
}

async function getOrdersByEmailAndPhone(email, phone) {
  return await db.getOrdersByEmailAndPhone(email, phone);
}

async function getOrderByTransactionNumber(transactionNumber) {
  return await db.getOrderByTransactionNumber(transactionNumber);
}

async function createOrder(orderData) {
  const productIdsWithQuantity = [];

  for (const product of orderData.products) {
    for (let i = 0; i < +product.quantity; i++) {
      productIdsWithQuantity.push(product.id);
    }
  }
  
  const shop = await db.getShopWithProductsByIds(orderData.products.map(p => p.id));

  let totalPrice = 0;

  for (const product of shop.products) {
    const orderedProduct = orderData.products.find(p => p.id == product.id);
    const quantity = orderedProduct.quantity;
    const productPrice = product.price * quantity;
    totalPrice = totalPrice + productPrice;
  }

  if (orderData.coupon) {
    const coupon = await db.getCouponByCode(orderData.coupon);
    if (coupon) {
      const discount = (coupon.discount / 100.00) * totalPrice;
      totalPrice = totalPrice - discount;
    }
  }

  return await db.createOrder(
    orderData.email,
    orderData.phone,
    orderData.name,
    orderData.address,
    orderData.coupon,
    totalPrice,
    productIdsWithQuantity
  );
}

module.exports = {
  getAllShops,
  getShopsWithProducts,
  getAllCoupons,
  createOrder,
  getOrdersByEmailAndPhone,
  getOrderByTransactionNumber,
  getShopWithProductsByIds
};