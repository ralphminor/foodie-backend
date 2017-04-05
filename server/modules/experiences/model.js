import mongoose, { Schema } from 'mongoose';

const ExperienceSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    minLength: [5, 'Title must be at least 5 characters long.']
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description must be at least 10 characters long.']
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Minimum is 1.'],
    max: [5, 'Maximum is 5.'],
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be an integer value.'
    }
  },
  imgUrl: {
    type: String,
    required: false
  },
  experienceDate: {
    type: Date
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }
}, { timestamps: true });

export default mongoose.model('Experience', ExperienceSchema);