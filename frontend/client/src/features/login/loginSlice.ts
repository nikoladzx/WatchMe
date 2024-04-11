import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/API/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { basketSlice, setBasket } from "../Basket/basketSlice";

interface LoginState {
    user : User | null
}

const initialState : LoginState = {
    user: null
}
export const registerUser = createAsyncThunk<User, FieldValues>(
    'login/registerUser',
    async (data, thunkApi) => {
        try {
            const user = await agent.User.register(data);
            //localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (error : any) {
            return thunkApi.rejectWithValue({error: error.data})
        }
    }
)

export const registerAdmin = createAsyncThunk<User, FieldValues>(
    'login/registerAdmin',
    async (data, thunkApi) => {
        try {
            const user = await agent.User.registerAdmin(data);
            //localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (error : any) {
            return thunkApi.rejectWithValue({error: error.data})
        }
    }
)

export const logInUser = createAsyncThunk<User, FieldValues>(
    'login/logInUser',
    async (data, thunkApi) => {
        try {
            const user = await agent.User.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            //setBasket(basketSlice);
            return user;
        }
        catch (error : any) {
            return thunkApi.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'login/fetchCurrentUser',
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const user = await agent.User.getCurrentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (error : any) {
            return thunkApi.rejectWithValue({error: error.data})
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loggedOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            //setBasket(basket);
            //setBasket(0);
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired, pls login again');
            router.navigate('/');
        })
        builder.addMatcher(isAnyOf(logInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(logInUser.rejected), (state, action) => {
            console.log(action.payload);
        })
    })
})

export const {loggedOut, setUser} = loginSlice.actions;