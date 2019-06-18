const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g); // # 이후 공백 제외 모든 문자가 하나 이상 일치
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));

      console.log(result);
      await newPost.addHashtags(result.map(r => r[0]));
    }

    // const User = await newPost.getUser();
    // newPost.User = User;
    // res.json(newPost);
    
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
      }],
    });

    res.json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', (req, res) => {

});

module.exports = router;