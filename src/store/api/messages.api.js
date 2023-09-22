
import { api } from './api.js'

export const messagesApi = api.injectEndpoints({
  endpoints: builder => ({
    getDialog: builder.query({
      query: () => '/messages/',
      providesTags: () => [{
        type: 'messages'
      }]
    }),
    getThisDialog: builder.query({
      query: (id) => `/messages/${id}`,
      providesTags: () => [{
        type: 'messages'
      }]
    }),
    pushMsg: builder.mutation({
      query: ({ id, msg, time, last}) => ({
        url: `/messages/${id}`,
        method: 'PATCH',
        body: { messages: msg, lastUpd: time, lastSenler: last }
      }),
      invalidatesTags: () => [{
        type: 'messages'
      }]
    }),
    clearNew: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'PATCH',
        body: { new: 0 }
      }),
      invalidatesTags: () => [{
        type: 'messages'
      }]
    }),
    incNew: builder.mutation({
      query: ({ id, count }) => ({
        url: `/messages/${id}`,
        method: 'PATCH',
        body: { new: count }
      }),
      invalidatesTags: () => [{
        type: 'messages'
      }]
    }),
    newDialog: builder.mutation({
      query: (body) => ({
        url: `/messages/`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: () => [{
        type: 'messages'
      }]
    }),
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
})


export const { useGetDialogQuery } = messagesApi
export const { usePushMsgMutation } = messagesApi
export const { useClearNewMutation } = messagesApi
export const { useIncNewMutation } = messagesApi
export const { useGetThisDialogQuery } = messagesApi
export const { useNewDialogMutation } = messagesApi
