const swag = require("../models/swag");
module.exports = {
  search: (req, res, next) => {
    console.log(req.query.category);
    if (!req.query.category) {
      res.status(200).json(swag);
    } else {
      const searched = swag.filter(item => item.category == req.query.category);
      res.status(200).json(searched);
    }
  }
};
