// import app from './src/app';
const app = require('./src/app');

app.listen(process.env.PORT, () => {
  console.log(`Server started`);
});
