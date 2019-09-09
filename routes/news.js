const router = require('express').Router()
const catchErrors = require('../middlewares/catchErrors')
const checkRole = require('../middlewares/checkRole')
const {getNews, createNew, deleteNew, createNewForm} = require('../controllers/news')

router.get('/news', catchErrors(getNews))
router.get('/create', createNewForm)

router.post('/create', checkRole('EDITOR'), catchErrors(createNew))

router.get('/delete/:id', checkRole('ADMIN'), catchErrors(deleteNew))

module.exports = router