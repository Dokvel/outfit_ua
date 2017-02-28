import{ EmailTemplate } from 'email-templates';
import nodemailer from 'nodemailer';
import { htmlToText } from 'nodemailer-html-to-text';
import wellknown from 'nodemailer-wellknown';
import async from 'async';
import path from 'path';

var transport = nodemailer.createTransport({ //TODO: Need make config related to NODE_ENV
  service: 'gmail',
  auth: {
    user: 'mariusrave@gmail.com',
    pass: 'marius295822549'
  }
});

transport.use('compile', htmlToText({ ignoreImage: true }));

export function emailsSender(templatePath, data = [], host) {
  let template = new EmailTemplate(templatePath);
  let vendorDir = path.resolve(__dirname, '..', 'vendor');

  async.mapLimit(data, 10, (item, next) => {
    template.render({ ...item, host }, (err, results) => {
      if (err) {
        return next(err);
      } else {

        let meta = {
          from: "order+outfit_ua@mail.ru",
          to: "outfit_ua@mail.ru",
          subject: "Замовлення #" + item.order.number,
          html: results.html
        };

        transport.sendMail(meta, (err, responseStatus) => {
          if (err) {
            return next(err)
          }
          next(null, responseStatus)
        });
      }
    });
  }, (err, results) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Successfully sent %d messages', results.length)
    }
  });
}
