import Post from './models/post';
import Product from './models/product';
import cuid from 'cuid';

export default function () {
  Post.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum`;

    const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum. Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet.`;

    const post1 = new Post({
      name: 'Admin',
      title: 'Hello MERN',
      slug: 'hello-mern',
      cuid: 'cikqgkv4q01ck7453ualdn3hd',
      content: content1
    });
    const post2 = new Post({
      name: 'Admin',
      title: 'Lorem Ipsum',
      slug: 'lorem-ipsum',
      cuid: 'cikqgkv4q01ck7453ualdn3hf',
      content: content2
    });

    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });

  Product.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const product1 = new Product({
      name: 'Платье',
      code: '268-c01',
      cuid: cuid(),
      description: `Состав: Трикотаж тринитка, стрейчевая ткань Длина: Длина изделия - 84 см., длина рукава (реглан) - 25 см. Рост модели - 172 см.`,
      price: 700,
      photos: [
        { link: 'http://ru.nenka.ua/assets/images/2071/39/39-2071.IMG_8765.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/40/40-2071.IMG_8769.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/39/39-2071.IMG_8765.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/40/40-2071.IMG_8769.jpg' },
      ]
    });
    const product2 = new Product({
      name: 'Платье',
      code: '268-c02',
      cuid: cuid(),
      description: `Состав: Трикотаж тринитка, стрейчевая ткань Длина: Длина изделия - 84 см., длина рукава (реглан) - 25 см. Рост модели - 172 см.`,
      price: 700,
      photos: [
        { link: 'http://ru.nenka.ua/assets/images/2071/39/39-2071.IMG_8765.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/40/40-2071.IMG_8769.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/39/39-2071.IMG_8765.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/40/40-2071.IMG_8769.jpg' },
      ]
    });
    const product3 = new Product({
      name: 'Майка',
      code: '267-c01',
      cuid: cuid(),
      description: `Состав: Трикотаж тринитка, стрейчевая ткань Длина: Длина изделия - 84 см., длина рукава (реглан) - 25 см. Рост модели - 172 см.`,
      price: 580,
      photos: [
        { link: 'http://ru.nenka.ua/assets/images/2071/39/39-2071.IMG_8765.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/40/40-2071.IMG_8769.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/39/39-2071.IMG_8765.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/40/40-2071.IMG_8769.jpg' },
      ]
    });
    const product4 = new Product({
      name: 'Рубашка',
      code: '265-c01',
      cuid: cuid(),
      description: `Состав: Трикотаж тринитка, стрейчевая ткань Длина: Длина изделия - 84 см., длина рукава (реглан) - 25 см. Рост модели - 172 см.`,
      price: 250,
      photos: [
        { link: 'http://ru.nenka.ua/assets/images/2071/39/39-2071.IMG_8765.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/40/40-2071.IMG_8769.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/39/39-2071.IMG_8765.jpg' },
        { link: 'http://ru.nenka.ua/assets/images/2071/40/40-2071.IMG_8769.jpg' },
      ]
    });

    Product.create([product1, product2, product3, product4], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
