import mongoose from 'mongoose'


const pdfSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fileName: String,
    data: Buffer,
})

const Pdf = mongoose.model('Pdf', pdfSchema);

export default Pdf;
  