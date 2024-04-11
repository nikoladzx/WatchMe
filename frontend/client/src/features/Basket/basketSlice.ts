import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/API/agent";

interface BasketState {
    basket: Basket | null,
    status: string
    
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, {model: string, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({model, quantity = 1})=> {
        try {
            return await agent.Basket.addItem(model, quantity);
        }
        catch (error) {
            console.log(error);
        }
    })

    export const removeBasketItemAsync = createAsyncThunk<void, {model: string, quantity?: number}>(
        'basket/removeBasketItemAsync',
        async ({model, quantity = 1})=> {
            try {
                await agent.Basket.removeItem(model, quantity);
            }
            catch (error) {
                console.log(error);
            }
        })
export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state,action) => {
            state.basket = action.payload
        },
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action)=> {
            console.log(action);
            state.status = 'pendingAdditem' + action.meta.arg.model;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action)=> {
            
            state.basket=action.payload;
            state.status = 'fulfilledAdditem';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action)=> {
            
            
            state.status = 'fulfilledAdditem';
        });
        builder.addCase(removeBasketItemAsync.pending, (state,action)=>{
            state.status = 'pendingRemoveItem' + action.meta.arg.model;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action)=>{
            const {model, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i=>i.name === model);
            
            if (itemIndex === -1 || itemIndex ===undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity!;
            if (state.basket?.items[itemIndex].quantity ===0 || quantity===0) state.basket?.items.splice(itemIndex, 1);
            state.status='idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state,action)=>{
            state.status = 'idle';
        });
    })
})

export const {setBasket} = basketSlice.actions;