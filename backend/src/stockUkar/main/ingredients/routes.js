const {Router} = require('express')
const router = Router()
const controller  = require('./controller')

router.get('/',controller.getIngredient)
router.get('/Search/:elementSearch',controller.searchIngred)
router.get('/:id',controller.getIngredById)
router.get('/nomCate/listNomCate',controller.listNomCate)
router.get('/nomCate/:id',controller.searchByCate)
router.delete('/:id', controller.deleteIngredient)
router.put('/:id', controller.updateIngredient)
router.post('/',controller.addIngredient)

module.exports = router;