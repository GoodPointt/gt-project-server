const app = require('./app');
const mongoose = require('mongoose');
const { DEV_PORT } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(process.env.DEV_PORT, () => {
      console.log(`🛠️  Server is up and ready on port: ${DEV_PORT}`);
    });
  })
  .then(() => console.log('🌐 Database connected successfully'))
  .catch((error) => {
    console.log('⚠️ Database conection failed:', error.message);
    process.exit(1);
  });
