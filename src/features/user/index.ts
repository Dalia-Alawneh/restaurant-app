import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces'
import SaberCookies from 'saber-cookies'
export interface IUserSlice {
    user: IUser  | null;
    token: string | null;
    isAdmin: boolean;
}

const initialState: IUserSlice = {
    user: null,
    token: null,
    isAdmin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser: (state, action: PayloadAction<{ jwt: string; user: IUser}>) => {
            state.user = action.payload.user
            state.isAdmin = action.payload.user.isAdmin
            state.token = action.payload.jwt
            SaberCookies.set("user", JSON.stringify(state.user), 3600)
            SaberCookies.set("token", state.token, 3600)
        },
        retrieveUserFromCookie: (state) => {
            const userValue = SaberCookies.get('user');

            if (userValue) {
                const user = JSON.parse(userValue);
                state.user = user;
                state.isAdmin = user.isAdmin;
            }
        },
        logout: (state)=>{
            state.user = null;
            state.token = null;
            state.isAdmin = false;
        }
    },
})

export const { storeUser, retrieveUserFromCookie, logout } = userSlice.actions

export default userSlice.reducer