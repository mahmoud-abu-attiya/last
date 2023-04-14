import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        value: {}
    },
    reducers: {
        setSettingsData: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setSettingsData } = settingsSlice.actions

export default settingsSlice.reducer