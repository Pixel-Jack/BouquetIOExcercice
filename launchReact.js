const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.resolve(__dirname, '.', 'front', 'build')));
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'front', 'build', 'index.html'));
});

module.exports = router;