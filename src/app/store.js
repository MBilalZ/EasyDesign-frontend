import {configureStore} from "@reduxjs/toolkit";
import connectionSlice from "@/features/connections/connectionSlice.js";

export const store = configureStore({
    reducer: {
        connectionsList: connectionSlice,
    },
    devTools: true,
});
