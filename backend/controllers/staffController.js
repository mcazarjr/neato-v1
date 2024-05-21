import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Get staff list
// @route   GET /api/staffs/list
// @access  Private/Admin
const getStaffList = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  const stafflist = users.map(
    ({ _id, first_name, last_name, designation, isArchived }) => ({
      id: _id,
      name: first_name + " " + last_name,
      designation: designation,
      isArchived: isArchived,
    })
  );
  res.status(200).json(stafflist);
});

// @desc Get staff details by ID
// @route GET /api/staffs/id/:id
// @access Private/Admin
const getStaffById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update staff details
// @route   PUT /api/staffs/id/:id
// @access  Private/Admin
const updateStaff = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.employee_id = req.body.employee_id || user.employee_id;
    user.last_name = req.body.last_name || user.last_name;
    user.first_name = req.body.first_name || user.first_name;
    user.designation = req.body.designation || user.designation;
    user.mobile = req.body.mobile || user.mobile;
    user.email = req.body.email || user.email;
    user.hiring_date = req.body.hiring_date || user.hiring_date;
    user.isArchived = req.body.isArchived || user.isArchived;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      employee_id: updatedUser.employee_id,
      last_name: updatedUser.last_name,
      first_name: updatedUser.first_name,
      designation: updatedUser.designation,
      mobile: updatedUser.mobile,
      email: updatedUser.email,
      hiring_date: updatedUser.hiring_date,
      isArchived: updatedUser.isArchived,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Create Staff user account
// @route GET /api/staffs/create
// @access Private/Admin
const createStaff = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // Verify if user is login and is a manager otherwise throw unauthorized error
  if (!user || user.designation !== "Manager") {
    res.status(401);
    throw new Error("Not authorized");
  }

  const {
    employee_id,
    last_name,
    first_name,
    designation,
    mobile,
    email,
    password,
  } = req.body;
  const staffExist = await User.findOne({ employee_id });

  if (staffExist) {
    res.status(400);
    throw new Error("Staff already exists");
  }

  const createdStaff = await User.create({
    employee_id,
    last_name,
    first_name,
    designation,
    mobile,
    email,
    password,
  });

  if (createdStaff) {
    res.status(201).json({
      _id: createdStaff._id,
      employee_id: createdStaff.employee_id,
      last_name: createdStaff.last_name,
      first_name: createdStaff.first_name,
      designation: createdStaff.designation,
      mobile: createdStaff.mobile,
      email: createdStaff.email,
      hiring_date: createdStaff.hiring_date,
      availability: createdStaff.availability,
      isArchived: createdStaff.isArchived,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { createStaff, getStaffList, getStaffById, updateStaff };
