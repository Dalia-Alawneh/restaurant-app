import { Outlet } from "react-router-dom";
import FormWrapper from "./components/FormWrapper";

const AuthLayout = () => {
    return (
        <div className="bg-[#f0f0f0] min-h-screen flex justify-center items-center">
            <div className="w-full w-{{calc(100% - 50px)}} max-w-[550px] m-auto h-full">
                <FormWrapper>
                    <Outlet />
                </FormWrapper>
            </div>
        </div>
    );
};

export default AuthLayout;