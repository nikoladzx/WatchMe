import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/API/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async ()=> {
        try{
            return await agent.Catalog.list();
        }
        catch (error) {
            console.log(error);
        }
    })
    export const fetchProductsFilteredAsync = createAsyncThunk<Product[]>(
        'catalog/fetchProductsFilteredAsync',
        async ()=> {
            try{
                return await agent.Catalog.list();
            }
            catch (error) {
                console.log(error);
            }
        })

    export const catalogSlice = createSlice({
        name: 'catalog',
        initialState: productsAdapter.getInitialState({
            productsLoaded: false,
            status: 'idle'
        }),
        reducers: {},
        extraReducers: (builder => {
            builder.addCase(fetchProductsAsync.pending, (state)=> {
                state.status = 'pendingFetchProducts';
            });
            builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
                productsAdapter.setAll(state, action.payload);
                state.status = 'idle';
                state.productsLoaded = true;
            });
            builder.addCase(fetchProductsAsync.rejected, (state)=>{
                state.status ='idle';
            })
        })
    });

    export const productSelectors = productsAdapter.getSelectors((state: RootState)=> state.catalog);