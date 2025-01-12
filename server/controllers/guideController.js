import Guide from "../models/Guide.js";

// Create New Guide
export const createGuide = async (req, res) => {
  const newGuide = new Guide(req.body);

  try {
    const savedGuide = await newGuide.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedGuide,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

// Update Guide
export const updateGuide = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedGuide = await Guide.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedGuide,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

// Delete Guide
export const deleteGuide = async (req, res) => {
  const id = req.params.id;

  try {
    await Guide.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// Get Single Guide
export const getSingleGuide = async (req, res) => {
  const id = req.params.id;

  try {
    const guide = await Guide.findById(id).populate("tours");

    res.status(200).json({
      success: true,
      message: "Successfully found",
      data: guide,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// Get All Guides
export const getAllGuides = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const guides = await Guide.find({})
      .populate("tours")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: guides.length,
      message: "Successful",
      data: guides,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// Get Guides by Search
export const getGuideBySearch = async (req, res) => {
  const name = new RegExp(req.query.name, "i");
  const language = new RegExp(req.query.language, "i");

  try {
    const guides = await Guide.find({
      name,
      languages: { $regex: language },
    }).populate("tours");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: guides,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// Get Featured Guides
export const getFeaturedGuide = async (req, res) => {
  try {
    const guides = await Guide.find({ featured: true })
      .populate("tours")
      .limit(18);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: guides,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// Get Guide Count
export const getGuideCount = async (req, res) => {
  try {
    const guideCount = await Guide.estimatedDocumentCount();

    res.status(200).json({ success: true, data: guideCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
