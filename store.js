import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlices'
import renderForProgramsReducer from './slices/forPrograms'
import themeReducer from './slices/themeSlice'
import backtoReducer from './slices/backto'

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        forPrograms: renderForProgramsReducer,
        theme: themeReducer,
        backto: backtoReducer,
    },
})