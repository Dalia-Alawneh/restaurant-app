import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces'
import SaberCookies from 'saber-cookies'
export interface IUserSlice {
    user: IUser | null;
    isAdmin:boolean;
}

const initialState: IUserSlice = {
    user:null,
    isAdmin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAdmin = action.payload.isAdmin
            SaberCookies.set("user", JSON.stringify(state.user), 3600)
        },
        retrieveUserFromCookie: (state) => {
            const userValue = SaberCookies.get('user');

            if (userValue) {
                const user = JSON.parse(userValue);
                state.user = user;
                state.isAdmin = user.isAdmin;
            }
        }
    },
})

export const { storeUser, retrieveUserFromCookie  } = userSlice.actions

export default userSlice.reducer