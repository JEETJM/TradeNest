export const getToken = () => {
  return (
    localStorage.getItem("tradenest_token") ||
    sessionStorage.getItem("tradenest_token")
  );
};

export const getUser = () => {
  const user =
    localStorage.getItem("tradenest_user") ||
    sessionStorage.getItem("tradenest_user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid stored user:", error);
    return null;
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("tradenest_token");
  localStorage.removeItem("tradenest_user");

  sessionStorage.removeItem("tradenest_token");
  sessionStorage.removeItem("tradenest_user");
};