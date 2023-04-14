import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlices'
import renderSwiperReducer from './slices/renderSwiper'

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        renderSwiper: renderSwiperReducer,
    },
})