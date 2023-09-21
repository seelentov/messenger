
import { api } from './api.js'


export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getTask: builder.query({
      query: () => '/users',
      providesTags: () => [{
        type: 'users'
      }]
    }),
    getPost: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: () => [{
        type: 'users'
      }]
    }),
    getMessages: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: () => [{
        type: 'users'
      }]
    }),
    editName: builder.mutation({
      query: ({id, name}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: { name }
      }),
      invalidatesTags: () => [{
        type: 'users'
      }]
    }),
    editIMG: builder.mutation({
      query: ({id, img}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: { img }
      }),
      invalidatesTags: () => [{
        type: 'users'
      }]
    }),
    postTask: builder.mutation({
      query: (item) => ({
        body: item,
        url: '/users/',
        method: 'POST'
      }),
      invalidatesTags: () => [{
        type: 'users'
      }]
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/users/${taskId}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{
        type: 'users'
      }]
    }),
  })
})


export const {useGetPostQuery} = userApi
export const {usePostTaskMutation} = userApi
export const {useEditNameMutation} = userApi
export const {useEditIMGMutation} = userApi
export const {useGetTaskQuery} = userApi
export const {useGetMessagesQuery} = userApi
