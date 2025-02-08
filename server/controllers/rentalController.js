import Rental from "../models/Rental.js";

// Create New Rental
export const createRental = async (req, res) => {
  const newRental = new Rental(req.body);

  try {
    const savedRental = await newRental.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedRental,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

// Update Rental
export const updateRental = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedRental = await Rental.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedRental,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

// Delete Rental
export const deleteRental = async (req, res) => {
  const id = req.params.id;

  try {
    await Rental.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// Get Single Rental
export const getSingleRental = async (req, res) => {
  const id = req.params.id;

  try {
    const rental = await Rental.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully found",
      data: rental,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

// Get All Rentals
export const getAllRentals = async (req, res) => {
  const page = parseInt(req.query.page) || 0;

  try {
    const rentals = await Rental.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: rentals.length,
      message: "Successful",
      data: rentals,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

// Get Rentals by Search
export const getRentalBySearch = async (req, res) => {
  const name = new RegExp(req.query.name, "i");
  const location = new RegExp(req.query.location, "i");

  try {
    const rentals = await Rental.find({
      name,
      location: { $regex: location },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: rentals,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

// Get Featured Rentals
export const getFeaturedRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ featured: true })
      .populate("reviews")
      .limit(18);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: rentals,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

// Get Rental Count
export const getRentalCount = async (req, res) => {
  try {
    const rentalCount = await Rental.estimatedDocumentCount();

    res.status(200).json({ success: true, data: rentalCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
};
