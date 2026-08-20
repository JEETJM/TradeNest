export const getToken = () => {
  return (
    localStorage.getItem("tradenest_token") ||
    sessionStorage.getItem("tradenest_token")
  );
};

export const getStoredUser = () => {
  const user =
    localStorage.getItem("tradenest_user") ||
    sessionStorage.getItem("tradenest_user");

  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("tradenest_token");
  localStorage.removeItem("tradenest_user");

  sessionStorage.removeItem("tradenest_token");
  sessionStorage.removeItem("tradenest_user");
};