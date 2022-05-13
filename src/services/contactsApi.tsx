// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../model/contact.model";
// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getAllContact: builder.query<Contact[], void>({
      query: () => ({
        url: "contacts",
        method: "GET",
      }),
      providesTags: ["Contact"]
    }),
    getContactById: builder.query({
      query: (id) => {
        console.log("ID Data", id);
        return {
          url: `contacts/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Contact"]
    }),
    getContactByLimit: builder.query({
      query: (num) => {
        console.log("Limit Number", num);
        return {
          url: `contacts?_limit=${num}`,
          method: "GET",
        };
      },
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => {
        console.log("Delete ID >>>", id);
        return {
          url: `contacts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Contact"]
    }),
    createContact: builder.mutation<{}, Contact>({
      query: (newContact) => {
        console.log("New Data Contact >>>", newContact);
        return {
          url: `contacts`,
          method: "POST",
          body: newContact,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["Contact"]
    }),
    updateContact: builder.mutation<void, Contact>({
      query: (updatedData) => {
        console.log("Update Data Contact >>>", updatedData);
        const { id, ...data } = updatedData;
        console.log("Current Update Data Contact >>>", data);
        return {
          url: `contacts/${id}`,
          method: "PUT",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["Contact"]
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllContactQuery,
  useGetContactByIdQuery,
  useGetContactByLimitQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
  useUpdateContactMutation,
} = contactsApi;
