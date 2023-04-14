import { createSlice } from '@reduxjs/toolkit'

export const renderSwiperSlice = createSlice({
    name: 'renderSwiper',
    initialState: {
        value: false,
    },
    reducers: {
        setRenderSwiper: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setRenderSwiper } = renderSwiperSlice.actions

export default renderSwiperSlice.reducer