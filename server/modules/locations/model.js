import mongoose, { Schema } from 'mongoose';

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Location name must be 5 characters minimum."]
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Location description must be 10 characters minimum."]
  },
  category: {
    type: String
  },
  experiences: [{
    type: Schema.Types.ObjectId,
    ref: 'Experience'
  }]
}, { timestamps: true });

// Create an experience and add it to the location's experience array.

LocationSchema.statics.addExperience = async function(id, args) {
  const Experience = mongoose.model('Experience');

  // Add the location id to the experience.
  // This is the location where the experience took place.
  const experience = await new Experience({ ...args, location: id });

  // After we find (above) the experience's location using the id from req.params,
  // we push the experience id onto the experiences element.
  const location = await this.findByIdAndUpdate(id, { $push: { experiences: experience.id } });

  return {
    experience: await experience.save(),
    location
  };
};

export default mongoose.model('Location', LocationSchema);
