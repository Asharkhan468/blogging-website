const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" };
    }
if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return { success: true, data };
  } catch (error) {
    console.error("Login error:", error.message);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.user.token));
    }

    return { success: true, data };
  } catch (error) {
    console.error("Login error:", error.message);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const createPost = async (title, description, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);

    const res = await fetch(`${BASE_URL}api/v1/create`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to create post",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Create post error:", error.message);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const fetchPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}api/v1/posts`, {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch posts",
      };
    }

    return { success: true, data: data.posts };
  } catch (error) {
    console.error("Fetch posts error:", error.message);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const likePost = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}api/v1/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    if (!res.ok) return { success: false, message: data.message };

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Like post error:", error.message);
    return { success: false, message: "Something went wrong" };
  }
};

export const addComment = async (postId, text) => {
  try {
    const res = await fetch(`${BASE_URL}api/v1/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message };
    }

    return {
      success: true,
      message: data.message,
      comments: data.comments,
    };
  } catch (error) {
    console.error("Add comment error:", error.message);
    return { success: false, message: "Something went wrong" };
  }
};

export const savePost = async (postId) => {
  try {
    // 🔹 Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id; // ya user?.id depending on structure

    if (!userId) {
      return { success: false, message: "User not found in local storage" };
    }

    // 🔹 API request
    const res = await fetch(`${BASE_URL}api/v1/save/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message };
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("Save post error:", error.message);
    return { success: false, message: "Something went wrong" };
  }
};

export const unsavePost = async (postId) => {
  try {
    // 🔹 Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id; // ya user?.id depending on structure

    if (!userId) {
      return { success: false, message: "User not found in local storage" };
    }

    // 🔹 API request
    const res = await fetch(`${BASE_URL}api/v1/unsave/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message };
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("Save post error:", error.message);
    return { success: false, message: "Something went wrong" };
  }
};

export const updateUserProfile = async (userId, name, profileImageFile) => {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required" };
    }
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (profileImageFile) formData.append("profileImage", profileImageFile);

    const res = await fetch(`${BASE_URL}api/v1/updateProfile/${userId}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message };
    }

    if (data.user) {
      const localUser = {
        email: data.user.email,
        id: data.user._id,
        name: data.user.name,
        profileImage: data.user.profileImage,
        savedPost: data.user.savedPosts,
      };
      localStorage.setItem("user", JSON.stringify(localUser));
    }

    return {
      success: true,
      message: data.message,
      user: data.user,
    };
  } catch (error) {
    console.error("Profile update error:", error.message);
    return { success: false, message: "Something went wrong" };
  }
};

export const getSavedPost = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      return { success: false, message: "User not found in local storage" };
    }

    // 🔹 API request
    const res = await fetch(`${BASE_URL}api/v1/saved/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message };
    }
    // 🔹 Return saved posts
    return {
      success: true,
      message: "Saved posts fetched successfully",
      posts: data,
    };
  } catch (error) {
    console.error("Get saved posts error:", error.message);
    return { success: false, message: "Something went wrong" };
  }
};


export const logoutUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}api/auth/logout`, {
      method: "POST",
      credentials: "include", // required for cookie
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Logout failed" };
    }

    // localStorage clear
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Logout error:", error.message);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};
