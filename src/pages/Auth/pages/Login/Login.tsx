import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../../../components/ui/Input";
import { useFormik } from "formik";
import { postData } from "../../../../helpers/api";
import { signinSchema } from "../../../../schemas";
import toast from "react-hot-toast";
import { loginFormFeilds } from "../../../../constants";
import { useAppDispatch } from "../../../../app/store";
import { storeUser } from "../../../../features/user";

interface IFormData {
    identifier: string;
    password: string;
}
export interface FormikErrorsWithIndexSignature {
    [key: string]: string | undefined;
}
export interface FormikTouchedWithIndexSignature {
    [key: string]: boolean | undefined;
}
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const location = useLocation()
    const isAdminAuthPage = location.pathname === '/admin/auth';
    const {
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
    } = useFormik<IFormData>({
        initialValues: {
            identifier: "",
            password: "",
        },
        validationSchema: signinSchema,
        onSubmit: async (values) => {
            console.log(values);
            try {
                const res = await postData("/auth/local", values);
                console.log(res);
                dispatch(storeUser(res))
                setTimeout(() => {
                    if (res.user.isAdmin) {
                        navigate("/");
                    } else {
                        navigate("/home");
                    }
                }, 1000)
            } catch (e) {
                console.log(e);
                toast.error("Something goes wrong.!🥲");
            }
        },
    });

    const validationErrors: FormikErrorsWithIndexSignature = errors
    const formikTouched: FormikTouchedWithIndexSignature = touched
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className="flex flex-col gap-4 w-full">
            <p className="text-[18px] text-center font-semibold">
                Sign up your account
            </p>
            <form className="flex flex-col gap-6 mt-4" onSubmit={handleSubmit}>
                {loginFormFeilds.map((field, index) => (
                    <div key={index}>
                        <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={field.placeholder}
                            type={field.type}
                            name={field.name}
                        />
                        {validationErrors[`${field.name}`] && formikTouched[`${field.name}`] && (
                            <p className="text-red-500 text-xs">* {validationErrors[`${field.name}`]}</p>
                        )}
                    </div>
                ))}

                <button
                    disabled={hasErrors}
                    type="submit"
                    className={`${hasErrors ? "cursor-not-allowed" : ""
                        } bg-[--primary] mt-3 text-white hover:bg-[--primary-dark] transition`}
                >
                    Sign in
                </button>
            </form>
            {!isAdminAuthPage && <p>
                Don't have an account? <Link to="/auth/register">Sign up</Link>
            </p>}
        </div>
    );
};

export default Login;