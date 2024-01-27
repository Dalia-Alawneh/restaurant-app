
import SaberCookies from 'saber-cookies'

export const getUserFromCookies = () => {
  const userValue = SaberCookies.get('user');
  if (userValue) {
      return JSON.parse(userValue);
  }
}