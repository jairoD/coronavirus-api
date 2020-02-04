const router = require('express').Router();
const controller = require('./controller');

router.route('/specific').get(controller.specific);
router.route('/overall').get(controller.overall)
module.exports = router;