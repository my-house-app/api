const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

async function cloudinaryUploader(images = []) {
  if (images.length === 0) return [];
  return Promise.all(
    images.map(async (image) => {
      const resp = await cloudinary.uploader.upload(image);
      return resp.secure_url;
    })
  );
}

module.exports = cloudinaryUploader;
