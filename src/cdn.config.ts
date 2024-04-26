import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CDN_NAME,
  api_key: process.env.CDN_APIKEY,
  api_secret: process.env.CDN_APISCRT,
  secure: true
});

export { cloudinary as cdn}