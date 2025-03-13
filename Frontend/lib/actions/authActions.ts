"use server";
export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch("localhost:4000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (token: string | null) => {
  if (!token) {
    return {
      success: false,
      error: "No token provided",
    };
  }

  try {
    const response = await fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Prevent caching of the logout request
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Logout failed",
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Error during logout: ${error}`,
    };
  }
};
