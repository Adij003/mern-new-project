const express = require('express');
const router = express.Router();
const EmailVerificationController = require('../controllers/backend/EmailVerificationController');
const upload = require('../middlewares/multer');

router.post('/single', EmailVerificationController.verifySingleEmail);

// router.post('/bulk', upload.single('local_file'), EmailVerificationController.verifyBulkEmail);

router.post('/bulk', upload.single('csv_file'), EmailVerificationController.verifyBulkEmail);

router.get('/bulk/status', EmailVerificationController.checkJobStatus);

router.get('/bulk/start', EmailVerificationController.startEmailVerification);

router.get('/credits', EmailVerificationController.credits);

module.exports = router;
