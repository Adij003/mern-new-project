const mongoose = require('mongoose');

const creditHistorySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    credits_allotted: { type: Number, required: true },
    credits_consumed: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});
    
const CreditHistory = mongoose.model('CreditHistory', creditHistorySchema);

module.exports = CreditHistory