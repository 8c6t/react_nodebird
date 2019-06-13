module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // 앞이 대문자이면 복수형으로 생성됨
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  // 관계 설정
  User.associate = (db) => {
    db.User.hasMany(db.Post, { as: 'Post' });
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
  };

  return User;
};
