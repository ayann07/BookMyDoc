import mongoose from "mongoose";
import { nanoid} from 'nanoid';
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    ref_no: {
        type: String
    },
    isSolved:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

ContactSchema.pre('save', function (next) {
    if (this.isNew && !this.ref_no) {
        this.ref_no = nanoid(7);
    }
    next();
});


export default mongoose.model("Contact", ContactSchema);