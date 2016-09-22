const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/outfit_ua',
  port: process.env.PORT || 8000,
  UPLOADS_DIR: 'uploads'
};

export default config;
