module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_genecal_ci',
  });

  Comment.associate = (db) => {
   db.Comment.belongsTo(db.User);
   db.Comment.belongsTo(db.Post); 
  };

  return Comment;
};
