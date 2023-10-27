const app = require('./app');
require('dotenv').config();
const schedule = require('node-schedule');
const axios = require('axios');
const mongoose = require('mongoose');
const { DEV_PORT, REQ_URL } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(process.env.DEV_PORT, () => {
      console.log(`🛠️  Server is up and ready on port: ${DEV_PORT}`);
    });
  })
  .then(() => console.log('🌐 Database connected successfully'))
  .catch(error => {
    console.log('⚠️ Database conection failed:', error.message);
    process.exit(1);
  });

const job = schedule.scheduleJob('*/14 * * * *', async () => {
  try {
    const response = await axios.get(REQ_URL);
    if (response.status === 200) {
      console.log('✅ GET request to API successful');
    } else {
      console.error(
        '❌ GET request to API failed:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error('❌ Error making GET request:', error.message);
  }
});
