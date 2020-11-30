const db = require('../config/mySQL');

module.exports = {
    sortProduct: (param) => {
        return new Promise((resolve, reject) => {
          let qs = `SELECT p.id, p.product_name, p.product_brand, p.product_rating, p.product_desc, c.category_name, p.product_price, pc.color_name, s.sizes_name, p.product_qty, p.product_img, p.product_condition, p.created_at, p.updated_at FROM products p JOIN categories c ON p.product_category = c.id JOIN colors pc ON p.product_color = pc.id JOIN sizes s ON p.product_size = s.id `
          qs += param
          db.query(qs, (err, data) => {
            if (!err) {
              resolve(data)
            } else {
              reject({
                msg: `Please input sorting params first`
              })
            }
          })
        })
      },
    postNewProduct: (insertBody) => {
        return new Promise((resolve, reject) => {
            const qs = 'INSERT INTO products SET ?';
            db.query(qs, insertBody, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            const qs =
                'SELECT p.id, p.product_name, p.product_brand, p.product_rating, p.product_desc, c.category_name, p.product_price, pc.color_name, s.sizes_name, p.product_qty, p.product_img, p.product_condition, p.created_at, p.updated_at FROM products p JOIN categories c ON p.product_category = c.id JOIN colors pc ON p.product_color = pc.id JOIN sizes s ON p.product_size = s.id WHERE p.id = ?';
            db.query(qs, id, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    updateProduct: (updateBody, id) => {
        return new Promise((resolve, reject) => {
            const qs = 'UPDATE products SET ? WHERE id = ?';
            db.query(qs, [updateBody, id], (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            const qs = 'DELETE FROM products WHERE id = ?';
            db.query(qs, id, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
};