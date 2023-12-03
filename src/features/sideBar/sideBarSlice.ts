import { createSlice } from '@reduxjs/toolkit'

export interface IToggleSideBar {
    value: boolean
}

const initialState: IToggleSideBar = {
    value: false,
}

export const toggleSideBarSlice = createSlice({
    name: 'toggleSideBar',
    initialState,
    reducers: {
        toggleSideBar: (state) => {
            state.value = !state.value
        },
    },
})

export const { toggleSideBar } = toggleSideBarSlice.actions

export default toggleSideBarSlice.reducer