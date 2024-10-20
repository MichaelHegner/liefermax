import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        products: [],
        total: 0,
        numberOfProducts: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.numberOfProducts += 1;
            state.total += action.payload.price * action.payload.amount;
        },
        removeProduct: (state, action) => {
            const leftProducts = state.products.filter((product) => product._id !== action.payload._id);
            state.products = leftProducts;
            state.numberOfProducts -= 1;
            state.total -= action.payload.price * action.payload.amount;
        },
        clear: (state) => {
            state.products = [];
            state.numberOfProducts = 0;
            state.total = 0;
        }
    }
});

export const {addProduct, removeProduct, clear} = basketSlice.actions;
export default basketSlice.reducer;