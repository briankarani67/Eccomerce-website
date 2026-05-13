const express = require('express');
const router = express.Router();
// Import the new profile controller
const profileController = require('../controllers/profileController');

// All routes are now handled by profileController
router.get('/:id', profileController.getProfile);
router.post('/create', profileController.createProfile);
router.put('/update/:id', profileController.updateProfile);

module.exports = router;