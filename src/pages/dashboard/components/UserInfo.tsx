import { userDefaultImage } from "../../../assets"

interface IProps {
    name:string;
}
const UserInfo = ({name}: IProps) => {
    return (
        <div className="flex gap-4 items-center">
            <img src={userDefaultImage} className="w-20 rounded-full" alt="" />
            <div>
                <h1 className="font-semibold text-[25px] mb-2 capitalize">Hello {name}!</h1>
                <p >All the metrics were updated today, let's take a look</p>
            </div>
        </div>
    )
}

export default UserInfo