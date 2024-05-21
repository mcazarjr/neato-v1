import { apiSlice } from "./apiSlice";
const AVAILABILITY_URL = "/api/availability";

export const availabilitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailabilitiesById: builder.query({
      query: (id) => ({
        url: `${AVAILABILITY_URL}/id/${id}`,
        method: "GET",
      }),
    }),
    updateAvailabilities: builder.mutation({
      query: (data) => ({
        url: `${AVAILABILITY_URL}/id/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    createAvailabilities: builder.mutation({
      query: (data) => ({
        url: `${AVAILABILITY_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAvailabilitiesByIdQuery,
  useUpdateAvailabilitiesMutation,
  useCreateAvailabilitiesMutation,
} = availabilitiesApiSlice;
