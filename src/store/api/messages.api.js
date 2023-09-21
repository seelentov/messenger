
import { api } from './api.js'


export const messagesApi = api.injectEndpoints({
  endpoints: builder => ({
    getDialog: builder.query({
      query: () => '/messages/',
      providesTags: () => [{
        type: 'messages'
      }]
    }),
    pushMsg: builder.mutation({
      query: ({id, msg}) => ({
        url: `/messages/${id}`,
        method: 'PATCH',
        body: { messages: msg }
      }),
      invalidatesTags: () => [{
        type: 'messages'
      }]
    }),
  })
})


export const { useGetDialogQuery } = messagesApi
export const { usePushMsgMutation } = messagesApi
