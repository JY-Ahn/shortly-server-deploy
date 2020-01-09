const { users } = require('../../models');
const crypto = require('crypto');


module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    var shasum = crypto.createHash('sha1');
    shasum.update(req.body.password);
    req.body.password = shasum.digest('hex');
    users.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    .then(async (result) => {
      if(result) {
        req.session.userid = await result.dataValues.id;
        req.session.save(function() {
          res.status(200).send({ id: result.dataValues.id });
        })
      } else {
        res.status(404).send('unvalid user');
      }
    })
  }
};
