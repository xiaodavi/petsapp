const express = require('express');
const router  = express.Router();

router.get('/map', (req, res) => {
  res.render("match/map")
})



module.exports = router;