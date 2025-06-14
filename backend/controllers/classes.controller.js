const Class = require("../models/class.model");

exports.createClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const {
      category,
      zone,
      language,
      mode,
      minPrice,
      maxPrice,
      minRating,
      maxRating
    } = req.query;

    const filter = {};

    if (category) filter.category = { $in: category.split(",") };
    if (zone) filter.zone = { $in: zone.split(",") };
    if (language) filter.language = { $in: language.split(",") };
    if (mode) filter.mode = { $in: mode.split(",") };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (minRating || maxRating) {
      filter.rating = {};
      if (minRating) filter.rating.$gte = parseFloat(minRating);
      if (maxRating) filter.rating.$lte = parseFloat(maxRating);
    }

    const classes = await Class.find(filter).populate("instructor", "name lastName email profileImage");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getClassById = async (req, res) => {
  try {
    const foundClass = await Class.findById(req.params.id).populate("instructor");
    if (!foundClass) return res.status(404).json({ error: "Clase no encontrada" });
    res.status(200).json(foundClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) return res.status(404).json({ error: "Clase no encontrada" });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ error: "Clase no encontrada" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};