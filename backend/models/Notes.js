const mongoose = require('mongoose');
const {Schema} = mongoose;
const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //* Foreign Key
        ref : 'user'
    },
    title:{
        type : String,
        require: true
    },
    description : {
        type: String,
        required : true
    },
    tag:{
        type: String,
    }
});

module.exports = mongoose.model("notes", notesSchema);