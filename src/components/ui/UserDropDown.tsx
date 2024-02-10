import { LogOutIcon } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  children?: ReactNode;
  redirectRoute?: string;
  rightPosition?: string;
}

const UserDropDown = ({ isOpen, children, redirectRoute = '/', rightPosition = "right-2" }: IProps) => {
  const handleLogout = useLogout();

  return (
    <>
      {isOpen && (
        <div className={`bg-white min-w-[200px] absolute top-24 ${rightPosition} shadow-lg rounded-lg py-3`}>
          <p onClick={() => handleLogout(redirectRoute)} className="cursor-pointer flex py-3 gap-4 px-4 items-center hover:bg-[#f9caca] hover:text-[#923030]">
            <LogOutIcon size={20} color="red" />
            Logout
          </p>
          {children}
        </div>
      )}
    </>
  );
};

export default UserDropDown;
