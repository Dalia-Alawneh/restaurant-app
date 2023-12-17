import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITempOrder, IUser } from '../../interfaces'

export interface IUserSlice {
    user: IUser;
    isAdmin:boolean;
}

const initialState: IUserSlice = {
    user: {
        id: 0,
        username: '',
        email: '',
        blocked: false,
        isAdmin: false,
        provider: '',
        confirmed: true,
        createdAt: '',
        updatedAt: '',
    },
    isAdmin: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAdmin = action.payload.isAdmin
        }
    },
})

export const { storeUser } = userSlice.actions

export default userSlice.reducer