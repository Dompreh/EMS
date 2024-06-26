import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const kanbanAdapter = createEntityAdapter({});
const initialState = kanbanAdapter.getInitialState();

export const kanbanApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getKanban: builder.query({
          query: () => ({
              url: '/kanban',
              validateStatus: (response, result) => {
                  return response.status === 200 && !result.isError;
              },
          }),
          transformResponse: responseData => {
              const loadedKanban = responseData.map(kanban => {
                  kanban.id = kanban._id;
                  return kanban;
              });
              return kanbanAdapter.setAll(initialState, loadedKanban);
          },
          providesTags: (result, error, arg) => {
              if (result?.ids) {
                  return [
                      { type: 'Kanban', id: 'LIST' },
                      ...result.ids.map(id => ({ type: 'Kanban', id })),
                  ];
              } else return [{ type: 'Kanban', id: 'LIST' }];
          },
      }),
      addNewKanban: builder.mutation({
          query: initializeKanbanData => ({
              url: '/kanban',
              method: 'POST',
              body: { ...initializeKanbanData },
          }),
          invalidatesTags: [{ type: 'Kanban', id: 'LIST' }],
      }),
      updateKanban: builder.mutation({
          query: initializeKanbanData => ({
              url: '/kanban',
              method: 'PATCH',
              body: { ...initializeKanbanData },
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'Kanban', id: arg.id }],
      }),
      deleteKanban: builder.mutation({
          query: ({ id }) => ({
              url: `/kanban/${id}`,
              method: 'DELETE',
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'Kanban', id: arg.id }],
      }),
  }),
});

export const {
  useGetKanbanQuery,
  useAddNewKanbanMutation,
  useUpdateKanbanMutation,
  useDeleteKanbanMutation
} = kanbanApiSlice;
