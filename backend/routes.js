const router = require('express').Router();
const sheetController = require('./controller/sheet-controller')
router.get('/api/sheets',sheetController.getSheet);
router.post('/api/add',sheetController.add)
module.exports = router;