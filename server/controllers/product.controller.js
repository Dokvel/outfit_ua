import Product from '../models/product';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';
/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getProducts(req, res) {
  Product.find().sort('name').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ products });
  });
}

export function addProduct(req, res) {
  if (!req.body.product.code || !req.body.product.price || !req.body.product.description) {
    res.status(403).end();
  } else {

    const newProduct = new Product(req.body.product);

    // Let's sanitize inputs
    newProduct.code = sanitizeHtml(newProduct.code);
    newProduct.name = sanitizeHtml(newProduct.name);
    newProduct.description = sanitizeHtml(newProduct.description);
    newProduct.group = sanitizeHtml(newProduct.group);
    newProduct.colors = Object.values(req.body.product.colors);

    newProduct.cuid = cuid();

    const existColors = newProduct.colors.map(o => o.cuid);

    req.files.forEach((file) => {
      var key = file.fieldname.split('[')[2].slice(0, -1);
      let existColorIndex = existColors.indexOf(key);
      if (existColorIndex > -1) {
        if (!newProduct.colors[existColorIndex].photos) {
          newProduct.colors[existColorIndex].photos = [];
        }
        newProduct.colors[existColorIndex].photos.push({ fileName: file.filename });
      }
    });

    newProduct.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ product: saved });
      }
    });
  }
}
export function updateProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid })
    .then(document => {
      if (!document || !req.body.product.price || !req.body.product.description) {
        res.status(403).end();
      } else {
        // Let's sanitize inputs
        document.name = sanitizeHtml(req.body.product.name);
        document.description = sanitizeHtml(req.body.product.description);
        document.category = req.body.product.category;
        document.group = req.body.product.group;
        document.isSale = req.body.product.isSale;
        document.price = req.body.product.price;
        document.inactive = req.body.product.inactive;
        document.defaultColor = req.body.product.defaultColor;

        let existColors = document.colors.map(o => o.cuid);

        let colors = Object.values(req.body.product.colors);

        colors.forEach((color, index) => {
          let existColorIndex = existColors.indexOf(color.cuid);
          if (existColorIndex > -1) {
            colors[index].photos = document.colors[existColorIndex].photos;
          }
        });
        document.colors = colors;

        existColors = document.colors.map(o => o.cuid);

        req.files.forEach((file) => {
          var key = file.fieldname.split('[')[2].slice(0, -1);
          let existColorIndex = existColors.indexOf(key);
          if (existColorIndex > -1) {
            if (!document.colors[existColorIndex].photos) {
              document.colors[existColorIndex].photos = [];
            }
            document.colors[existColorIndex].photos.push({ fileName: file.filename });
          }
        });

        return document.save();
      }
    })
    .then(saved=> {
      res.json({ product: saved });
    })
    .catch(err=> {
      res.status(500).send(err);
    });
}
