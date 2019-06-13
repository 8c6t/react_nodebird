const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParer = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const db = require('./models');

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

const app = express();
db.sequelize.sync();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParer(process.env.COOKIE_SECRET));
app.use(session({
  resave: false, // 매번 세션 강제 저장
  saveUninitialized: false, // 빈 값도 저장
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, // 자바스크립트에서 쿠키 조작 X
    secure: false, // https
  }
}));

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.listen(8620, () => {
  console.log('server is running on localhost:8620');
});
