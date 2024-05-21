import asyncHandler from "express-async-handler";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

import { uploadFile, getFileStream } from "../S3.js";

// @desc    Upload image
// @route   POST /api/jobs/:id/uploadImage
// @access  Private
const uploadImage = async (req, res) => {
  try {
    const job = await Job.findById(req.body.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const fileName = await uploadFile(req.file);
    job.imagesUrl.push(fileName);

    await job.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

// @desc    Fetch all jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json(jobs);
});

// @desc    Fetch single job
// @route   GET /api/jobs/:id
// @access  Private
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

// @desc    Fetch jobs by date
// @route   GET /api/jobs/:date
// @access  Private
const getJobsByDate = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ job_date: req.params.date });
  if (jobs.length > 0) {
    res.status(200).json(jobs);
  } else {
    res.status(404);
    throw new Error("Jobs not found");
  }
});

// @desc    Fetch jobs by status
// @route   GET /api/jobs/status
// @access  Private
const getJobsByStatus = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ job_status: req.params.status });
  if (jobs.length > 0) {
    res.status(200).json(jobs);
  } else {
    res.status(200).json([]);
  }
});

// @desc    Fetch job status by id
// @route   GET /api/jobs/:id/status
// @access  Private
const getJobStatusById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    const jobStatus = job.job_status;
    res.status(200).json({ job_status: jobStatus });
  } else {
    res.status(404);
    throw new Error("Job status not found");
  }
});

// @desc    Fetch job started
// @route   GET /api/jobs/started/:jobid
// @access  Private
const getJobStarted = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    const jobStarted = job.job_started;
    res.status(200).json({ job_started: jobStarted });
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

// @desc    Update job started
// @route   PUT /api/jobs/started/:id
// @access  Private
const updateJobStarted = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    job.job_started = !job.job_started;

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

// @desc    Update job status
// @route   PUT /api/jobs/status/:id
// @access  Private
const updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const { job_status } = req.body;

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    // Update the job_status field
    job.job_status = job_status;
    await job.save();

    res.status(200).json({ message: "Job status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job status" });
  }
};

const updateNotesFromCleaner = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const { notes } = req.body.data;

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    // Update the notes (cleaner_description) field in the job
    job.cleaner_description = notes;

    // Save the updated job
    const updatedJob = await job.save();

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update task status for a job
const updateTaskStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const { taskIds, taskStatus } = req.body;

    // Update the task statuses
    job.job_task.forEach((task) => {
      if (taskIds.includes(task._id.toString())) {
        task.task_status = taskStatus;
      }
    });

    await job.save();

    res.json({ message: "Task statuses updated successfully" });
  } catch (error) {
    console.error("Error updating task statuses:", error);
    res.status(500).json({ error: "Error updating task statuses" });
  }
};

// @desc   Update Job Start
// @route  PUT /api/jobs/:id/start
// @access Private
const updateJobStart = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id);
  const job = await Job.findById(req.params.id);

  const { job_started, job_status } = req.body;

  if (job) {
    job.job_started = job_started;
    job.job_status = job_status;
    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

// @desc    Create a new job
// @route   POST /api/jobs/create
// @access  Private
const createJob = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // Verify if user is login and is a manager otherwise throw unauthorized error
  if (!user || user.designation !== "Manager") {
    res.status(401);
    throw new Error("Not authorized");
  }

  const {
    job_title,
    job_client,
    job_location,
    job_status,
    job_started,
    job_starttime,
    job_endtime,
    job_staff,
    job_date,
    job_description,
    job_createdby,
    job_task,
    cleaning_type,
  } = req.body;

  const createdJob = await Job.create({
    job_title,
    job_client,
    job_location,
    job_status,
    job_started,
    job_starttime,
    job_endtime,
    job_staff,
    job_date,
    job_description,
    job_createdby,
    job_task,
    cleaning_type,
  });

  if (createdJob) {
    res.status(201).json(createdJob);
  } else {
    res.status(400);
    throw new Error("Invalid job data");
  }
});

// @desc    Update job details
// @route   PUT /api/jobs/id/:id
// @access  Private/Admin
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    job.job_title = req.body.job_title || job.job_title;
    job.job_client = req.body.job_client || job.job_client;
    job.job_location = req.body.job_location || job.job_location;
    job.job_status = req.body.job_status || job.job_status;
    job.job_starttime = req.body.job_starttime || job.job_starttime;
    job.job_endtime = req.body.job_endtime || job.job_endtime;
    job.job_date = req.body.job_date || job.job_date;
    job.job_description = req.body.job_description || job.job_description;
    job.job_task = req.body.job_task || job.job_task;
    job.job_staff = req.body.job_staff || job.job_staff;
    job.isArchived = req.body.isArchived || job.isArchived;
    job.cleaning_type = req.body.cleaning_type || job.cleaning_type;

    const updatedJob = await job.save();

    res.status(200).json({
      _id: updatedJob._id,
      job_title: updatedJob.job_title,
      job_client: updatedJob.job_client,
      job_location: updatedJob.job_location,
      job_status: updatedJob.job_status,
      job_starttime: updatedJob.job_starttime,
      job_endtime: updatedJob.job_endtime,
      job_date: updatedJob.job_date,
      job_description: updatedJob.job_description,
      job_task: updatedJob.job_task,
      job_staff: updatedJob.job_staff,
      isArchived: updatedJob.isArchived,
      cleaning_type: updatedJob.cleaning_type,
    });
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

// @desc   Get all Job Images by Job ID
// @route  GET /api/jobs/images
// @access Private
const getJobImages = asyncHandler(async (req, res) => {
  const id = req.query.id;
  const job = await Job.findById(id);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  const images = job.imagesUrl;
  const imagesUrl = [];

  for (const image of images) {
    const url = await getFileStream(image);
    imagesUrl.push(url);
  }

  res.status(200).json(imagesUrl);
});

export {
  createJob,
  updateJob,
  getJobs,
  getJobById,
  getJobsByDate,
  getJobsByStatus,
  getJobStarted,
  updateJobStarted,
  updateJobStatus,
  updateJobStart,
  getJobStatusById,
  updateTaskStatus,
  uploadImage,
  updateNotesFromCleaner,
  getJobImages,
};
