import { LogOutIcon } from "lucide-react"
import { useAppDispatch } from "../../app/store";
import { logout } from "../../features/user";
import { useNavigate } from "react-router-dom";
import SaberCookies from 'saber-cookies'

interface IProps {
  isOpen: boolean;
}
const UserDropDown = ({ isOpen }: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    SaberCookies.remove('user');
    SaberCookies.remove('token');
    dispatch(logout())
    setTimeout(() => navigate('/auth'), 500)
  }
  return (
    isOpen && <div className="bg-white min-w-[200px] absolute top-24 right-2 shadow-lg rounded-lg py-3">
      <p onClick={handleLogout} className="cursor-pointer flex py-3 gap-4 px-4 items-center hover:bg-[#f9caca] hover:text-[#923030]"><LogOutIcon size={20} color="red" />Logout</p>
    </div>
  )
}

export default UserDropDown