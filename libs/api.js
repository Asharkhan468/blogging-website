const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" };
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
    console.log(data);

    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    // ✅ Return successful response
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
    // 🧩 FormData use for sending text + image
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile); // 👈 image key must match backend field name

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
    if (!res.ok) return { success: false, message: data.message };

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Like post error:", error.message);
    return { success: false, message: "Something went wrong" };
  }
};
