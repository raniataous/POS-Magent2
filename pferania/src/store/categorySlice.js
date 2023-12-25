import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        status: STATUS.IDLE,
        catProductAll : [],
        catProductAllStatus: STATUS.IDLE,
        catProductSingle : [],
        catProductSingleStatus: STATUS.IDLE
    },

    reducers: {
        setCategories(state, action){
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
        setCategoriesProductAll(state, action){
            state.catProductAll.push(action.payload);
        },
        setCategoriesStatusAll(state, action){
            state.catProductAllStatus = action.payload;
        },
        setCategoriesProductSingle(state, action){
            state.catProductSingle = action.payload;
        },
        setCategoriesStatusSingle(state, action){
            state.catProductSingleStatus = action.payload;
        }
    }
});

export const { setCategories, setStatus, setCategoriesProductAll, setCategoriesStatusAll, setCategoriesProductSingle, setCategoriesStatusSingle } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = () => {
    return async function fetchCategoryThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING));
        
    }
}

export const fetchProductsByCategory = (categoryID, dataType) => {
    return async function fetchCategoryProductThunk(dispatch){
        if(dataType === 'all') dispatch(setCategoriesStatusAll(STATUS.LOADING));
        if(dataType === 'single') dispatch(setCategoriesStatusSingle(STATUS.LOADING));
        

       
    }
}
