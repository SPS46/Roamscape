import GuideBooking from "../models/GuideBooking.js";

// Create new guide booking
export const createGuideBooking = async (req, res) => {
  const newBooking = new GuideBooking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your guide has been booked successfully",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single guide booking
export const getGuideBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await GuideBooking.findById(id).populate("guideId");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: booking,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Booking not found" });
  }
};

// Get all guide bookings
export const getAllGuideBookings = async (req, res) => {
  try {
    const bookings = await GuideBooking.find().populate("guideId");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
