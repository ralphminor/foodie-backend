import Location from './model';
import { Experience } from '../experiences';

export const createLocation = async (req, res) => {
  const {
    name,
    description,
    category
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: "Location name must be provided." });
  } else if (typeof name !== 'string') {
    return res.status(400).json({ error: true, message: "Location name must be of type string." });
  } else if (name.length < 5) {
    return res.status(400).json({ error: true, message: "Location name must be at least 5 characters." })
  }

  if (!description) {
    return res.status(400).json({ error: true, message: "Description must be provided." });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: "Description must be of type string." });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: "Description must be at least 10 characters."
    });
  }

  const location = new Location({ name, description });

  try {
    return res.status(201).json({ error: false, location: await location.save() });
  } catch(e) {
    return res.status(400).json({ error: true, message: 'Error when creating location.' });
  }
};

export const createLocationExperience = async (req, res) => {
  const { itemName, description, rating, imgUrl } = req.body;
  const { locationId } = req.params;

  if (!itemName) {
    return res.status(400).json({ error: true, message: "An item name must be provided." });
  } else if (typeof itemName !== 'string') {
    return res.status(400).json({ error: true, message: "The item name must be of type string." });
  } else if (itemName.length < 5) {
    return res.status(400).json({
      error: true,
      message: "The item name must be at least 5 characters."
    })
  }

  if (!description) {
    return res.status(400).json({ error: true, message: "A description must be provided." });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: "Description must be of type string." });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: "Description must be at least 10 characters."
    })
  }

  if (!rating) {
    return res.status(400).json({ error: true, message: "A rating must be provided." });
  } else if (rating < 1 || rating > 5) {
    return res.status(400).json({
      error: true,
      message: "Rating must be between 1 and 5."
    })
  }

  if (!locationId) {
    return res.status(400).json({ error: true, message: "A Location ID must be provided." });
  }

  try {
    const { experience, location } = await Location.addExperience(locationId, { itemName, description, rating, imgUrl });
    return res.status(201).json({ error: false, experience, location });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Experience could not be created.' });
  }
}

export const getLocationExperiences = async (req, res) => {
  const { locationId } = req.params;

  if (!locationId) {
    return res.status(400).json({ error: true, message: 'You must provide a location id.' });
  }

  try {
    return res.status(200).json({
      error: false,
      experiences: await Experience.find({ location: locationId }).populate('location', 'name')
    });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Cannot find any experience(s).'})
  }
}
