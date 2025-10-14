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

    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    // ✅ Save user data in localStorage
    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
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


// export const savePost = async (postId, userId) => {
//   try {
//     const res = await fetch(`${BASE_URL}api/v1/save/${postId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ userId }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return { success: false, message: data.message };
//     }

//     return {
//       success: true,
//       message: data.message,
//     };
//   } catch (error) {
//     console.error("Save post error:", error.message);
//     return { success: false, message: "Something went wrong" };
//   }
// };


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
