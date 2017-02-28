/**
 * Created by alex on 24.02.17.
 */
var fs = require('fs'),
  crypto = require('crypto'),
  path = require('path'),
  requestPromise = require("request-promise-native"),
  cheerio = require("cheerio"),
  url = "http://viewmode.ua/51828-s01.html";

let code;
let category;

let product = {};
let color = { photos: [] };

const uploadsPath = path.resolve(__dirname, `./products/`);
let productUploadsPath = '';
requestPromise(url)
  .then((body) => {
    let $ = cheerio.load(body),
      $cartFill = $("#cartFill"),
      naming = $cartFill.find("div.pb-text h1").text(),
      photos = $("#goodsGallery").find("div.tabs-left > ul > li > a"),
      colorName = $cartFill.find("div.pb-text > div.color-name").text().split(':'),
      price = parseFloat($cartFill.find("div.pb-text > div.price-block > .price").text());

    let namingParts = naming.split(" ");
    code = namingParts.splice(namingParts.length - 1, 1)[0];
    category = namingParts.join(' ');

    color['name'] = colorName[1].trim();
    color['price'] = price;

    product['sourceCode'] = code.split('-')[0];
    product['sourceProductLink'] = url;
    product['description'] = $cartFill.find("div.pb-text > div.tabs-model > div > div:nth-child(1)").text();
    product['price'] = price;

    productUploadsPath = uploadsPath + `/art_${code || 'unknown'}/`;
    createDir(uploadsPath);
    createDir(productUploadsPath);

    return Promise.all(photos.toArray().map((photoItem) => {
      return {
        big: photoItem.attribs['data-zoom-big'],
        middle: photoItem.attribs['data-zoom-middle'],
        preview: photoItem.children[0].attribs['src']
      };
    }))
  })
  .then((results) => {
    return Promise.all(results.map((items) => {
      return new Promise((resolve, reject) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
          if (err) return reject(err);
          resolve([raw.toString('hex'), items]);
        })
      })
    }))
  })
  .then(photos => {
    return Promise.all(photos.map(photo => {
      let filename = photo[0];
      let ext = '';
      let files = photo[1];
      let newFilesMap = {};
      Object.keys(files).forEach(sizeKey => {
        let sizeFilePath = files[sizeKey];
        let uriParts = sizeFilePath.split('.');
        ext = uriParts[uriParts.length - 1];
        let fullFileName = filename + '_' + sizeKey + '.' + ext;
        newFilesMap[fullFileName] = 'http://viewmode.ua/' + sizeFilePath;
      });
      color['photos'].push({ fileName: filename, ext });
      return newFilesMap
    }))
  })
  .then((results) => {
    let flattenFilesMap = [];
    results.forEach(object => {
      Object.keys(object).forEach(key => {
        flattenFilesMap.push([key, object[key]]);
      });
    });
    console.log(flattenFilesMap);
    return Promise.all(flattenFilesMap.map((file) => {
      return new Promise((resolve, reject) => {
        requestPromise(encodeURI(file[1]))
          .pipe(fs.createWriteStream(productUploadsPath + file[0]))
          .on('close', () => {
            console.log(file[0]);
            resolve(file[0]);
          })
          .on('error', (error) => {
            reject(error);
          })
      });
    }))
  })
  .then((results) => {
    console.log(results.length)
  })
  .catch((err) => {
    console.log(err)
  });

const createDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
