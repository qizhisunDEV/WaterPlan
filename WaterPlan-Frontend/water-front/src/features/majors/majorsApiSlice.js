import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMajors: builder.query({
            query: () => '/majors',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, //remove this later
            transformResponse: responseData => {
                const loadedMajors = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return userAdapter.setAll(initialState, loadedMajors)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Major', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Major', id }))
                    ]
                } else return [{ type: 'Major', id: 'LIST' }]
            }
        }),
        addNewMajor: builder.mutation({
            query: initialUserData => ({
                url: '/majors',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                {type: 'Major', id: "LIST"}
            ]
        }),
        updateMajor: builder.mutation({
            query: initialUserData => ({
                url: '/majors',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Major', id: arg.id}
            ]
        }),
        deleteMajor: builder.mutation({
            query: ({ id }) => ({
                url: '/majors',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'Major', id: arg.id}
            ]
        }),
    })
})

export const {
    useGetMajorsQuery,
    useAddNewMajorMutation,
    useUpdateMajorMutation,
    useDeleteMajorMutation
} = usersApiSlice

// returns the query result object
export const selectMajorsResult = usersApiSlice.endpoints.getMajors.select()

// creates memoized selector
const selectMajorsData = createSelector(
    selectMajorsResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and rename them with aliases using destructuring
export const {
    selectAll: selectAllMajors,
    selectById: selectMajorById,
    selectIds: selectMajorIds
    // Pass in a selector that returns the users slice of state
} = userAdapter.getSelectors(state => selectMajorsData(state ?? initialState))