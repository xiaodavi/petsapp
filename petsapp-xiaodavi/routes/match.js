const express = require('express');
const router  = express.Router();

router.get('/cafe', (req, res) => {
  res.render("match/cafe")
})



module.exports = router;