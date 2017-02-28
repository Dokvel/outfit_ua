import path from 'path';
import { emailsSender } from './emailHelper';
const os = require('os');

const templatesDir = path.resolve(__dirname, 'templates');

export const PRODUCTION_DOMAIN = os.hostname();

export function sendOrder(order,date,  host) {
  emailsSender(path.join(templatesDir, 'send-order'), [{ order, date }], host);
}
