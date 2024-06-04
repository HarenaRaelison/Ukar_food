const { Router } = require('express');
const router = Router();
const controller = require('./controller');

// Routes for categories
router.get('/', controller.getCategories);
router.get('/:id', controller.getCategorieById);
router.post('/', controller.addCategorie);
router.put('/:id', controller.updateCategorie);
router.delete('/:id', controller.deleteCategorie);

module.exports = router;
