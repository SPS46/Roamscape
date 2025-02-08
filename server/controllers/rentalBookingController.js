import RentalBooking from "../models/RentalBooking.js";

// Create new rental booking
export const createRentalBooking = async (req, res) => {
  const newBooking = new RentalBooking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your rental has been booked successfully",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single rental booking
export const getRentalBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await RentalBooking.findById(id).populate("rentalId");
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successful",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all rental bookings
export const getAllRentalBookings = async (req, res) => {
  try {
    const bookings = await RentalBooking.find().populate("rentalId");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
