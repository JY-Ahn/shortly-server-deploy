'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      hooks: {
        afterValidate: (data, options) => {
          var shasum = crypto.createHash('sha1');
          shasum.update(data.password);
          data.password = shasum.digest('hex');
          
        }
      }
    }
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
