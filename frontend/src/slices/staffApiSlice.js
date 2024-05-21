import { apiSlice } from "./apiSlice";
const STAFF_URL = "/api/staffs";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStaffList: builder.query({
      query: () => ({
        url: `${STAFF_URL}/list`,
        method: "GET",
      }),
    }),
    getStaffById: builder.query({
      query: (id) => ({
        url: `${STAFF_URL}/id/${id}`,
        method: "GET",
      }),
    }),
    updateStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/id/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    archiveStaff: builder.mutation({
      query: (id) => ({
        url: `${STAFF_URL}/id/${id}`,
        method: "PUT",
        body: { isArchived: true },
      }),
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetStaffListQuery,
  useGetStaffByIdQuery,
  useUpdateStaffMutation,
  useArchiveStaffMutation,
  useCreateStaffMutation,
} = staffApiSlice;
