import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    job_title: {
      type: String,
      required: true,
    },
    job_client: {
      type: String,
      required: true,
    },
    job_location: {
      type: String,
      required: true,
    },
    job_status: {
      type: String,
      required: true,
    },
    job_started: {
      type: Boolean,
      default: false,
    },
    job_starttime: {
      type: String,
      required: true,
    },
    job_endtime: {
      type: String,
      required: true,
    },
    job_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    job_description: {
      type: String,
    },
    cleaner_description: {
      type: String,
      default: "",
      required: false,
    },
    job_createdby: {
      type: String,
      required: true,
    },
    cleaning_type: {
      type: String,
      required: true,
    },
    job_task: [
      {
        task_title: {
          type: String,
          required: false,
        },
        task_status: {
          type: Boolean,
          required: false,
        },
      },
    ],
    job_staff: {
      type: Array,
      default: [],
    },
    imagesUrl: [
      {
        type: String,
        default: "",
        required: true,
      },
    ],
    imageName: {
      type: String,
      default: "",
      required: false,
    },
    imageKey: {
      type: String,
      default: "",
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
      },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
