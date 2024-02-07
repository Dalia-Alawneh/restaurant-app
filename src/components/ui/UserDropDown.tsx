import { LogOutIcon } from "lucide-react"
import useLogout from "../../hooks/useLogout";

interface IProps {
  isOpen: boolean;
}
const UserDropDown = ({ isOpen }: IProps) => {
  const handleLogout = useLogout()
  return (
    isOpen && <div className="bg-white min-w-[200px] absolute top-24 right-2 shadow-lg rounded-lg py-3">
      <p onClick={()=>handleLogout('/')} className="cursor-pointer flex py-3 gap-4 px-4 items-center hover:bg-[#f9caca] hover:text-[#923030]"><LogOutIcon size={20} color="red" />Logout</p>
    </div>
  )
}

export default UserDropDown