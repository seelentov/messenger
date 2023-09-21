/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const API_URL = 'http://localhost:5000/'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['users', 'messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: builder => ({
    getUsers: builder.query({
      query: (item) => ({
        query: () => '/users'
      })
    })
  })
})

export const { useGetUsersQuery } = api