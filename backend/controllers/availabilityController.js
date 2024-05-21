import asyncHandler from "express-async-handler";
import Availabilities from "../models/availabilitiesModel.js";

// @desc    Get availability list by employee ID
// @route   GET /api/availability/:id
// @access  Private/Admin
const getAvailabilityById = asyncHandler(async (req, res) => {
  const availability = await Availabilities.findOne({
    _id: req.params.id,
  }).select("-__v -updatedAt -createdAt");
  if (availability) {
    res.status(200).json(availability);
  } else {
    res.status(404);
    throw new Error("Availability not found");
  }
});

// @desc    Create availability
// @route   POST /api/availability
// @access  Private/Admin
const createAvailability = asyncHandler(async (req, res) => {
  const {
    _id,
    employee_id,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  } = req.body;

  const availability = new Availabilities({
    _id,
    employee_id,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  });
  try {
    const createdAvailability = await availability.save();
    const { _id, employee_id, ...responseData } = createdAvailability._doc;
    console.log(responseData);
    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update availability
// @route   PUT /api/availability/:id
// @access  Private/Admin
const updateAvailability = asyncHandler(async (req, res) => {
  const availability = await Availabilities.findOne({
    _id: req.params.id,
  });
  if (availability) {
    availability.sunday = req.body.sunday;
    availability.monday = req.body.monday;
    availability.tuesday = req.body.tuesday;
    availability.wednesday = req.body.wednesday;
    availability.thursday = req.body.thursday;
    availability.friday = req.body.friday;

    const updatedAvailability = await availability.save();
    res.json(updatedAvailability);
  } else {
    res.status(404);
    throw new Error("Availability not found");
  }
});

export { getAvailabilityById, createAvailability, updateAvailability };
