import { useAppDispatch } from '../app/store';
import { logout } from '../features/user';
import { useNavigate } from 'react-router-dom';
import SaberCookies from 'saber-cookies';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (path:string) => {
    SaberCookies.remove('user');
    SaberCookies.remove('token');
    dispatch(logout());
    setTimeout(() => navigate(path), 500);
  };

  return handleLogout;
};

export default useLogout;
