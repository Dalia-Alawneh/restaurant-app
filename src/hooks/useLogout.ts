import { useAppDispatch } from '../app/store';
import { logout } from '../features/user';
import { useNavigate } from 'react-router-dom';
import SaberCookies from 'saber-cookies';

export default function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = (path: string) => {
    SaberCookies.remove('user');
    SaberCookies.remove('token');
    dispatch(logout());
    navigate(path, { replace: true })
    window.location.reload();
  };

  return handleLogout;
}

