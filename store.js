import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlices'
import renderForProgramsReducer from './slices/forPrograms'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        forPrograms: renderForProgramsReducer,
        theme: themeReducer,
    },
})