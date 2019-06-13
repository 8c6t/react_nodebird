module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    src: { // S3 저장
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_genecal_ci',
  });

  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };

  return Image;
}
