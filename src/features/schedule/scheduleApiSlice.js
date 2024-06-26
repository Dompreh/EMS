import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const scheduleAdapter = createEntityAdapter({});
const initialState = scheduleAdapter.getInitialState();

export const scheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getSchedule: builder.query({
          query: () => ({
              url: '/schedule',
              validateStatus: (response, result) => {
                  return response.status === 200 && !result.isError;
              },
          }),
          transformResponse: responseData => {
              const loadedSchedule = responseData.map(schedule => {
                  schedule.id = schedule._id;
                  return schedule;
              });
              return scheduleAdapter.setAll(initialState, loadedSchedule);
          },
          providesTags: (result, error, arg) => {
              if (result?.ids) {
                  return [
                      { type: 'Schedule', id: 'LIST' },
                      ...result.ids.map(id => ({ type: 'Schedule', id })),
                  ];
              } else return [{ type: 'Schedule', id: 'LIST' }];
          },
      }),
      addNewSchedule: builder.mutation({
          query: initializeScheduleData => ({
              url: '/schedule',
              method: 'POST',
              body: { ...initializeScheduleData },
          }),
          invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
      }),
      updateSchedule: builder.mutation({
          query: initializeScheduleData => ({
              url: `/schedule`,
              method: 'PATCH',
              body: { ...initializeScheduleData },
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'Schedule', id: arg.id }],
      }),
      deleteSchedule: builder.mutation({
          query: ({ id }) => ({
              url: `/schedule/${id}`,
              method: 'DELETE',
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'Schedule', id: arg.id }],
      }),
  }),
});

export const {
  useGetScheduleQuery,
  useAddNewScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation
} = scheduleApiSlice;
