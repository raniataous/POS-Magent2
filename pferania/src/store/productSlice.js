import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUS.IDLE,
    },

    reducers: {
        setProducts(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
    },
});

export const {setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => {
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING));
    }
        
}
