const API_URL = "http://localhost:5000/api";

// =====================================================
// SAVE TOKEN
// =====================================================

export const saveToken = (token) => {
  if (token) {
    localStorage.setItem("tradenest_token", token);
  }
};

// =====================================================
// GET TOKEN
// =====================================================

export const getToken = () => {
  return localStorage.getItem("tradenest_token");
};

// =====================================================
// SAVE USER
// =====================================================

export const saveUser = (user) => {
  if (user) {
    localStorage.setItem(
      "tradenest_user",
      JSON.stringify(user)
    );
  }
};

// =====================================================
// GET STORED USER
// =====================================================

export const getStoredUser = () => {
  const user = localStorage.getItem("tradenest_user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    return null;
  }
};

// =====================================================
// AUTH HEADERS
// =====================================================

export const authHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
};

// =====================================================
// IS AUTHENTICATED
// =====================================================

export const isAuthenticated = () => {
  return !!getToken();
};

// =====================================================
// FETCH CURRENT USER
// =====================================================

export const fetchCurrentUser = async () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: authHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch user."
      );
    }

    if (data.user) {
      saveUser(data.user);
    }

    return data.user;
  } catch (error) {
    console.error("Fetch current user error:", error);

    return null;
  }
};

// =====================================================
// LOGOUT
// =====================================================

export const logout = () => {
  localStorage.removeItem("tradenest_token");
  localStorage.removeItem("tradenest_user");
};

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async ({
  firstName,
  lastName,
  phone,
  profileImage,
}) => {
  const token = getToken();

  if (!token) {
    throw new Error("You are not logged in.");
  }

  // ===================================================
  // FORM DATA
  // ===================================================

  const formData = new FormData();

  formData.append("firstName", firstName || "");
  formData.append("lastName", lastName || "");
  formData.append("phone", phone || "");

  // Add image only if user selected a new image
  if (profileImage instanceof File) {
    formData.append("profileImage", profileImage);
  }

  // ===================================================
  // API REQUEST
  // ===================================================

  const response = await fetch(
    `${API_URL}/auth/profile`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update profile."
    );
  }

  // ===================================================
  // SAVE UPDATED USER
  // ===================================================

  if (data.user) {
    saveUser(data.user);
  }

  // Return USER directly
  // so ProfilePage can use updatedUser.profileImage
  return data.user;
};