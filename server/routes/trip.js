const express = require('express');
const router = express.Router();
const { createTrip, joinTrip, getTrips, getTripDetails, updateGroupChecklist, updatePersonalChecklist, removeMember } = require('../controllers/tripController');
const auth = require('../middlewares/authMiddleware');

router.post('/create', auth, createTrip);
router.post('/join', auth, joinTrip); 
router.get('/', auth, getTrips);
router.get('/:id', auth, getTripDetails);  

router.put('/:tripId/group-checklist',auth,updateGroupChecklist);
router.put('/:tripId/personal-checklist',auth,updatePersonalChecklist);
router.delete('/:tripId/members/:memberId',auth,removeMember);

module.exports = router; 