import Experience from './model';

export const createExperience = async (req, res) => {
  const { itemName, description, rating, imgUrl } = req.body;
  const newExperience = new Experience({ itemName, description, rating, imgUrl });

  try {
    return res.status(201).json({ experience: await newExperience.save() });
  }
  catch(e) {
    return res.status(e.status).json({ error: true, message: 'Error creating experience.' });
  }
}

export const getAllExperiences = async (req, res) => {
  try {
    return res.status(200).json({ experiences: await Experience.find({})});
  }
  catch(e) {
    return res.status(e.status).json({ error: true, message: 'Error getting all Experiences' });
  }
}
