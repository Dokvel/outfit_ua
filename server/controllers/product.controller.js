import Product from '../models/product';
import Order from '../models/order';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';

import { sendOrder } from '../../emails';

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
          let key = file.fieldname.split('[')[2].slice(0, -1);
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
    .then(saved => {
      res.json({ product: saved });
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

export function sendCart(req, res) {
  let order = new Order({ ...req.body, number: 0 });
  order.save()
    .then(saved => {
      order = saved;
      return Product.find()
    })
    .then((products) => {
      let cartProducts = Object.keys(req.body.cart).map((path) => {
        let parsedPath = path.split('_');
        let product = products.filter((item) => item.cuid === parsedPath[0])[0];
        let colorUUID = getColorUuid(product, parsedPath[1]);
        return {
          productCuid: parsedPath[0],
          colorCode: parsedPath[1],
          sizeKey: parsedPath[2],
          count: req.body.cart[path].count,
          price: getProductPrice(product, colorUUID),
          link: `/products/${parsedPath[0]}-${parsedPath[1]}`
        };
      });
      sendOrder({
        phone: order.phone,
        cartProducts,
        number: order.number
      }, order.dateAdded, req.protocol + '://' + req.headers.host);
      res.json({ order });
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

const getProductPrice = (product, colorCUID) => {
  let price = 0;
  let color;
  if (product && (color = product.colors.filter((color) => colorCUID == color.cuid)[0])) {
    price = color.price || product.price;
    price = product.isSale || color.isSale ? price * 0.95 : price;
  } else {
    price = product.isSale ? product.price * 0.95 : product.price;
  }
  return parseInt(price)
};

const getColorUuid = (product, colorCode) => {
  let colorCUID;
  product.colors.some((color, index, _ary) => {
    if (color.code === colorCode) {
      colorCUID = color.cuid;
      return true;
    }
  });
  return colorCUID;
};

export function parseProduct(req, res) {
  if (req.body.product && req.body.product.url) {

  }
}