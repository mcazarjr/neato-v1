import { apiSlice } from "./apiSlice";
const JOBS_URL = "/api/jobs";

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobList: builder.query({
      query: () => ({
        url: `${JOBS_URL}/list`,
        method: "GET",
      }),
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `${JOBS_URL}/id/${id}`,
        method: "GET",
      }),
    }),
    getJobByStatus: builder.query({
      query: (status) => ({
        url: `${JOBS_URL}/status/${status}`,
        method: "GET",
      }),
    }),
    getJobByStarted: builder.query({
      query: (id) => ({
        url: `${JOBS_URL}/started/${id}`,
        method: "GET",
      }),
    }),
    updateJobStart: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/${data.id}/start`,
        method: "PUT",
        body: data,
      }),
    }),
    updateJobStatus: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/${data.id}/status`,
        method: "PUT",
        body: data,
      }),
    }),
    updateJobTaskStatus: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/${data.id}/${data.taskId}/taskStatus`,
        method: "PUT",
        body: data,
      }),
    }),
    updateNotesFromCleaner: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/${data.id}/notes`,
        method: "PUT",
        body: { data },
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/${data.id}/uploadImage`,
        method: "POST",
        contentType: "multipart/form-data",
        body: data,
      }),
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    archiveJob: builder.mutation({
      query: (id) => ({
        url: `${JOBS_URL}/id/${id}`,
        method: "PUT",
        body: { isArchived: true },
      }),
    }),
    updateJob: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/id/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getJobImages: builder.query({
      query: (id) => ({
        url: `${JOBS_URL}/images`,
        method: "GET",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetJobListQuery,
  useGetJobByIdQuery,
  useGetJobByStatusQuery,
  useGetJobByStartedQuery,
  useArchiveJobMutation,
  useUpdateJobMutation,
  useUpdateJobStartMutation,
  useUpdateJobStatusMutation,
  useUpdateJobTaskStatusMutation,
  useCreateJobMutation,
  useUploadImageMutation,
  useUpdateNotesFromCleanerMutation,
  useGetJobImagesQuery,
} = jobApiSlice;
