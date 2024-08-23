const Trip = require('../models/Trip');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
 
exports.createTrip = async(req, res) => {
    const { name, description } = req.body;
    try {
        const uniqueCode = uuidv4();
        const newTrip = new Trip({
            name: name,
            description: description,
            code: uniqueCode,
            members: [req.user.id],
            creator: req.user.id  
        });
        await newTrip.save();

        const user = await User.findById(req.user.id);
        user.trips.push(newTrip.id);
        await user.save();

        res.json(newTrip);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.joinTrip = async(req, res) => {
    const { code } = req.body;
    
    try {
     
        const trip = await Trip.findOne({ code: code });
    
        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found/Code Incorrect' });
        }
       
        if (!trip.members.includes(req.user.id)) {
            trip.members.push(req.user.id);
            await trip.save();

            const user = await User.findById(req.user.id);
            user.trips.push(trip.id);
            await user.save();
        }
       
        res.json(trip);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
 
exports.getTrips = async(req, res) => {
    try {
        const trips = await Trip.find({ members: req.user.id }).populate('members', 'name phone');  // Corrected to populate phone instead of email
        res.json(trips);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getTripDetails = async (req, res) => { 
    try {
        const trip = await Trip.findById(req.params.id).populate('members', 'name phone');  // Corrected to find by _id and populate phone
        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }
        res.json(trip);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error'); 
    }
};

exports.updateGroupChecklist = async(req,res)=>{
    try{
        const trip = await Trip.findById(req.params.tripId);
        if(!trip){
            return res.status(404).json({message: 'Trip not found'});
        }
        if(!trip.members.includes(req.user.id)){
            return res.status(403).json({message: 'Unauthorized'});
        }
        trip.groupChecklist = req.body.groupChecklist;
        await trip.save();  
        res.json(trip.groupChecklist);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

exports.updatePersonalChecklist = async(req,res)=>{
    try{ 
        const trip = await Trip.findById(req.params.tripId);
        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }
        let userChecklist = trip.personalChecklists.find(cl => cl.userId.toString() === req.user.id);
        if (userChecklist) {
            userChecklist.checklist = req.body.checklist;
        } else {
            userChecklist = { userId: req.user.id, checklist: req.body.checklist };
            trip.personalChecklists.push(userChecklist);
        }

        await trip.save();
        res.json(userChecklist.checklist);

    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

exports.removeMember = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.tripId);
        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        if (trip.creator.toString() !== req.user.id) {  
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        trip.members = trip.members.filter(member => member.toString() !== req.params.memberId);
        await trip.save();
        res.json({ msg: 'Member removed successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}