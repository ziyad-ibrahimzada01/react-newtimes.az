import {configureStore} from '@reduxjs/toolkit'
import home from './home.js'

export const store = configureStore({
    reducer: {
        home
    },
})