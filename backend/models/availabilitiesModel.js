import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const availabilitiesSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    employee_id: {
      type: Number,
      required: true,
      unique: true,
    },
    sunday: {
      type: {
        accr: String,
        name: String,
        checked: Boolean,
        start_time: String,
        end_time: String,
      },
      required: true,
    },
    monday: {
      type: {
        accr: String,
        name: String,
        checked: Boolean,
        start_time: String,
        end_time: String,
      },
      required: true,
    },
    tuesday: {
      type: {
        accr: String,
        name: String,
        checked: Boolean,
        start_time: String,
        end_time: String,
      },
      required: true,
    },
    wednesday: {
      type: {
        accr: String,
        name: String,
        checked: Boolean,
        start_time: String,
        end_time: String,
      },
      required: true,
    },
    thursday: {
      type: {
        accr: String,
        name: String,
        checked: Boolean,
        start_time: String,
        end_time: String,
      },
      required: true,
    },
    friday: {
      type: {
        accr: String,
        name: String,
        checked: Boolean,
        start_time: String,
        end_time: String,
      },
      required: true,
    },
    saturday: {
      type: {
        accr: String,
        name: String,
        checked: Boolean,
        start_time: String,
        end_time: String,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Availabilities = mongoose.model("Availabilities", availabilitiesSchema);

export default Availabilities;
