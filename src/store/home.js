import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    data: [{
        id: 1,
        name: 'Coder'
    }]
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setIsOpen: (state, {payload}) => {
            state.isOpen = !state.isOpen
        }
    },
})

export const {setIsOpen} = homeSlice.actions

export default homeSlice.reducer