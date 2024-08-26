import Administrative from "../models/AdminModel.js";

// Get the administrative record
export const getAdministrative = async (req, res) => {
  try {
    const administrative = await Administrative.findOne();
    if (!administrative) {
      return res
        .status(404)
        .json({ message: "Administrative record not found" });
    }
    res.status(200).json(administrative);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create the administrative record
export const createAdministrative = async (req, res) => {
  const { InstituteName, contactNumber, email, password } = req.body;

  try {
    const existingAdmin = await Administrative.findOne();
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Administrative record already exists" });
    }

    const administrative = new Administrative({
      InstituteName,
      contactNumber,
      email,
      password,
    });
    await administrative.save();
    res.status(201).json(administrative);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the administrative record
export const updateAdministrative = async (req, res) => {
  const { InstituteName, contactNumber, email, password } = req.body;

  try {
    const administrative = await Administrative.findOneAndUpdate(
      {},
      { InstituteName, contactNumber, email, password },
      { new: true, runValidators: true, upsert: true }
    );
    res.status(200).json(administrative);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
