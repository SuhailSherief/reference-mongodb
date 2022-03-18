import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength:[40, 'Title cant be more than 40 characters']
    },
    description:{
        type: String,
        required: true,
        maxlength:[200, 'Description cant be more than 200 characters']
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);