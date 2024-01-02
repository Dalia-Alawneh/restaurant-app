import { Navigate } from "react-router-dom";
import { IUser } from "../../interfaces";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { retrieveUserFromCookie } from "../../features/user";

interface IProps {
    children: ReactNode;
    redirectTo?: string;
}

const Protected = ({ children, redirectTo = '/auth' }: IProps) => {
    const dispatch = useAppDispatch()
    dispatch(retrieveUserFromCookie())
    const loggedInUser: IUser | null = useAppSelector(state => state.user.user);
    return loggedInUser ? (
        <>{children}</>
    ) : (
        <Navigate to={redirectTo} />
    );
};

export default Protected;
