import { Navigate, useLocation } from "react-router-dom";
import { IUser } from "../../interfaces";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { retrieveUserFromCookie } from "../../features/user";

interface IProps {
    children: ReactNode;
    redirectTo?: string;
}

const Protected = ({ children, redirectTo = "/" }: IProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(retrieveUserFromCookie());
    }, [dispatch]);

    const loggedInUser: IUser | null = useAppSelector((state) => state.user.user);
    const location = useLocation();
    if (!loggedInUser && location.pathname.startsWith("/auth")) {
        return <Navigate to={redirectTo} />;
    }

    return <>{children}</>;
};

export default Protected;
