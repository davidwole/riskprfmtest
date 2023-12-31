const express = require('express');
const router = express.Router();
const {
    loginUser,
    signupUser,
    getAllUsers,
    getSingleUser,
    editUser,
    deleteUser,
    inviteUser,
    reqigsterwithToken
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/singleuser/:id', getSingleUser);
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/invite', inviteUser);
router.post('/register/:token', reqigsterwithToken);
router.put('/edit/:id', editUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;