import container from '@/server/container';
import { PropertyController } from '@/server/controllers/property.controller';
import { passportInitialize, passportSession } from '@/server/passport';
import { sessions } from '@/server/sessions';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false
  }
};

export default container
  .resolve<PropertyController>('propertyController')
  .handler(
    '/api/properties', 
    [sessions, passportInitialize, passportSession, multer().any()], 
    201
  );
