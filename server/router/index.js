const router = require('express').Router();
const userController = require('../controllers/user-controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware');


router.post('/registration',
    body('email').isEmail(),
    userController.registration
);
router.post('/login', userController.login)
router.post('/logout',userController.logout)
router.get('/activate/:link',userController.activate)
router.get('/refresh',userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.delete('/users/:id', authMiddleware, userController.delete);
router.patch('/users/:id/block',authMiddleware, userController.block);
router.patch('/users/:id/unlock',authMiddleware, userController.unlock);

module.exports = router