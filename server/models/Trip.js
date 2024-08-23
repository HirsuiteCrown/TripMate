const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String },
  code: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groupChecklist: [
    {
      item: { type: String, required: true },
      doneBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }  
    } 
  ],
  personalChecklists: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      checklist: [
        {
          item: { type: String, required: true }
          
        }
      ]
    }
  ],
  createdAt: { type: Date, default: Date.now },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Trip', tripSchema);
