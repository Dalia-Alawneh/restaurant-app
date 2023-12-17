import Input from "../../../../components/ui/Input"
import { registerFormFeilds } from "../../../../constants"

interface IProps {

}
const Register = ({ }: IProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <p className="text-[18px] text-center font-semibold">Sign up your account</p>
            <form className="flex flex-col gap-4">
                {registerFormFeilds.map((feild, index) => (
                    <Input key={index} placeholder={feild.placeholder} type={feild.type} name={feild.name} />
                ))}

                <button type="submit" className="bg-[--primary] text-white hover:bg-[--primary-light] transition">Register</button>
            </form>
        </div>
    )
}

export default Register