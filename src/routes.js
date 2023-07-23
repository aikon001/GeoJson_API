const express = require("express");
const Service = require("./service");
const router = express.Router();

router.get(
  '/GeoJson',
  async (req, res) => {
    const callback = (status, message) => {
      res.status = status
      res.send(message);
    }

    var { query } = req;
    var service = new Service(callback);
    var result = await service.OpenStreetMap(query);
    res.send(result);

  }
)

module.exports = router;