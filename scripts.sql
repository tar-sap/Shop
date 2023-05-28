use shop;

CREATE TABLE shops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  photo VARCHAR(255)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  photo VARCHAR(255),
  price DECIMAL(10, 2) NOT NULL,
  shop_id INT NOT NULL,
  description TEXT,
  FOREIGN KEY (shop_id) REFERENCES shops(id)
);

CREATE TABLE IF NOT EXISTS coupons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  discount INT NOT NULL,
  code VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS OrderHistory (
  transaction_number INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  coupon VARCHAR(255),
  order_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS OrderProducts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_number INT,
  product_id INT,
  FOREIGN KEY (transaction_number) REFERENCES OrderHistory (transaction_number),
  FOREIGN KEY (product_id) REFERENCES Products (id)
);

INSERT INTO coupons (name, discount, code)
VALUES
  ('Coupon 1', 10, 'CODE1'),
  ('Coupon 2', 15, 'CODE2'),
  ('Coupon 3', 20, 'CODE3'),
  ('Coupon 4', 25, 'CODE4'),
  ('Coupon 5', 30, 'CODE5'),
  ('Coupon 6', 35, 'CODE6'),
  ('Coupon 7', 40, 'CODE7'),
  ('Coupon 8', 45, 'CODE8'),
  ('Coupon 9', 50, 'CODE9'),
  ('Coupon 10', 10, 'CODE10'),
  ('Coupon 11', 15, 'CODE11'),
  ('Coupon 12', 20, 'CODE12'),
  ('Coupon 13', 25, 'CODE13'),
  ('Coupon 14', 30, 'CODE14'),
  ('Coupon 15', 35, 'CODE15'),
  ('Coupon 16', 40, 'CODE16'),
  ('Coupon 17', 45, 'CODE17'),
  ('Coupon 18', 50, 'CODE18'),
  ('Coupon 19', 10, 'CODE19'),
  ('Coupon 20', 15, 'CODE20');

INSERT INTO shops (name, description, photo)
VALUES
  ('McDonalds', 'McDonalds is a globally recognized fast food chain known for its iconic golden arches and wide variety of menu options, offering classic burgers, fries, and signature items like the Big Mac and the McFlurry, catering to a diverse range of tastes and preferences.', 'mcdonalds.jpeg'),
  ('KFC', 'KFC, also known as Kentucky Fried Chicken, is a popular fast food restaurant specializing in fried chicken dishes, offering a unique blend of herbs and spices. With its distinctive red and white logo, KFC is known for its crispy chicken buckets, finger-licking good taste, and a range of sides like mashed potatoes and coleslaw, providing a satisfying and flavorful dining experience.', 'kfc.jpeg'),
    ('NOA', 'Noa is a trendy café and bar that offers a relaxed and vibrant atmosphere, serving a diverse selection of artisanal coffee, delicious pastries, and refreshing beverages. It is a popular spot for socializing, catching up with friends, or simply enjoying a cozy environment while indulging in tasty treats.', 'noa.jpeg'),
  ('Dominos', 'Dominos Pizza is a well-known pizza delivery and takeout chain, offering a wide range of pizzas with various toppings and crust options. Known for its speedy delivery service and commitment to quality, Dominos ensures piping hot and freshly made pizzas, making it a convenient choice for pizza lovers.', 'dominos pizza.jpeg'),
  ('I Love Kebab', 'I Love Kebab is a casual eatery that specializes in mouthwatering kebabs, packed with succulent meat or grilled vegetables, wrapped in soft flatbread and accompanied by a variety of sauces and toppings. With its emphasis on fresh ingredients and flavorsome combinations, I Love Kebab provides a satisfying and flavorful option for those craving a delicious and satisfying meal.', 'i_love_kebab.jpg');
  

INSERT INTO products (name, photo, price, shop_id, description)
VALUES
  ('Burger001', 'm1.jpg', 100, 1, 'Some test description'),
  ('Burger002', 'm2.jpg', 160, 1, 'Some test description'),
  ('Burger003', 'm3.jpg', 50, 1, 'Some test description'),
  ('Burger004', 'm4.jpg', 300, 1, 'Some test description'),
  ('Burger005', 'm5.jpg', 300, 1, 'Some test description'),
  ('Burger006', 'm6.jpg', 300, 1, 'Some test description'),
  ('ChikenBurger001', 'kf1.png', 300, 2, 'Some test description'),
  ('ChikenBurger002', 'kf2.png', 300, 2, 'Some test description'),
  ('ChikenBurger003', 'kf3.png', 300, 2, 'Some test description'),
  ('ChikenBurger004', 'kf4.png', 300, 2, 'Some test description'),
  ('ChikenBurger005', 'kf5.png', 300, 2, 'Some test description'),
  ('ChikenBurger006', 'kf6.png', 300, 2, 'Some test description'),
  ('Ramen001', 'n1.png', 300, 3, 'Some test description'),
  ('Ramen002', 'n2.png', 300, 3, 'Some test description'),
  ('Ramen003', 'n3.png', 300, 3, 'Some test description'),
  ('Ramen004', 'n4.png', 300, 3, 'Some test description'),
  ('Ramen005', 'n5.png', 300, 3, 'Some test description'),
  ('Ramen006', 'n6.png', 300, 3, 'Some test description'),
  ('Pizza001', 'd1.png', 300, 4, 'Some test description'),
  ('Pizza002', 'd2.png', 300, 4, 'Some test description'),
  ('Pizza003', 'd3.png', 300, 4, 'Some test description'),
  ('Pizza004', 'd4.png', 300, 4, 'Some test description'),
  ('Pizza005', 'd5.png', 300, 4, 'Some test description'),
  ('Pizza006', 'd6.png', 300, 4, 'Some test description'),
  ('Kebab001', 'kb1.jpg', 300, 5, 'Some test description'),
  ('Kebab002', 'kb2.jpg', 300, 5, 'Some test description'),
  ('Kebab003', 'kb3.jpg', 300, 5, 'Some test description'),
  ('Kebab004', 'kb4.jpg', 300, 5, 'Some test description'),
  ('Kebab005', 'kb5.jpg', 300, 5, 'Some test description'),
  ('Kebab006', 'kb6.jpg', 55, 5, 'Some test description');