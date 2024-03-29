import { Link, useNavigate } from "react-router-dom"
import Input from "../../../../components/ui/Input"
import { registerFormFeilds } from "../../../../constants"
import { useFormik } from "formik";
import { FormikErrorsWithIndexSignature, FormikTouchedWithIndexSignature } from "../Login/Login";
import { postData } from "../../../../helpers/api";
import toast from "react-hot-toast";
import { signupSchema } from "../../../../schemas";
interface IFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    city: string;
    phone: number | string;

}
const Register = () => {
    const navigate = useNavigate()
    const {
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
    } = useFormik<IFormData>({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            name: "",
            city: "",
            phone: "",
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            try {
                const res = await postData("/auth/local/register", values);
                setTimeout(() => {
                    if (res) {
                        navigate("/auth");
                    }
                }, 1000)
            } catch (e) {
                toast.error("Something goes wrong.!🥲");
            }
        }
    })
    const validationErrors: FormikErrorsWithIndexSignature = errors
    const formikTouched: FormikTouchedWithIndexSignature = touched
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className="flex flex-col gap-4 w-full">
            <p className="text-[18px] text-center font-semibold">Sign up your account</p>
            <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                    {registerFormFeilds.slice(0, 4).map((feild, index) => (
                        <div key={index}>
                            <Input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={feild.placeholder} type={feild.type} name={feild.name} />
                            {validationErrors[`${feild.name}`] && formikTouched[`${feild.name}`] && (
                                <p className="text-red-500 text-xs">* {validationErrors[`${feild.name}`]}</p>
                            )}
                        </div>
                    ))}
                </div>
                {registerFormFeilds.slice(4, registerFormFeilds.length).map((feild, index) => (
                    <div key={index}>
                        <Input
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={feild.placeholder} type={feild.type} name={feild.name} />
                        {validationErrors[`${feild.name}`] && formikTouched[`${feild.name}`] && (
                            <p className="text-red-500 text-xs">* {validationErrors[`${feild.name}`]}</p>
                        )}
                    </div>
                ))}

                <button
                    disabled={hasErrors}
                    type="submit"
                    className={`${hasErrors ? "cursor-not-allowed" : ""} bg-[--primary] mt-3 text-white hover:bg-[--primary-dark] transition`}>
                    Sign me up</button>
            </form>
            <p>Already have an account? <Link to='/auth'>Sign in</Link></p>
        </div>
    )
}

export default Register