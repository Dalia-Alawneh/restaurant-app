import { Link } from "react-router-dom"
import Input from "../../../../components/ui/Input"
import { registerFormFeilds } from "../../../../constants"

const Register = () => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <p className="text-[18px] text-center font-semibold">Sign up your account</p>
            <form className="flex flex-col gap-6 mt-4">
                {registerFormFeilds.map((feild, index) => (
                    <Input key={index} placeholder={feild.placeholder} type={feild.type} name={feild.name} />
                ))}

                <button type="submit" className="bg-[--primary] mt-3 text-white hover:bg-[--primary-dark] transition">Sign me up</button>
            </form>
            <p>Already have an account? <Link to='/auth/login'>Sign in</Link></p>
        </div>
    )
}

export default Register