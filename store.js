import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlices'
import renderForProgramsReducer from './slices/forPrograms'

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        forPrograms: renderForProgramsReducer,
    },
})