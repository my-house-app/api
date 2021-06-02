const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'my-house-app',
  api_key: '987194612959531',
  api_secret: 'k_4yNIv2IOW8f1V1kYCot70RO90',
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
