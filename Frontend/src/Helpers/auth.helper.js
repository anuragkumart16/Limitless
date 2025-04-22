const url = import.meta.env.VITE_BACKEND;
async function checkToken() {
  try {
    const token = localStorage.getItem("accessToken") || null;
    const response = await fetch(`${url}/api/v1/user/verifyJWT`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await fetch(`${url}/api/v1/user/getaccesstoken`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function loginUserViaEmail(email, password) {
  try {
    const response = await fetch(`${url}/api/v1/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function loginUserViaUsername(username, password) {
  try {
    const response = await fetch(`${url}/api/v1/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function resetPasswordViaEmail(email) {
  try {
    const response = await fetch(`${url}/api/v1/user/reset`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
async function resetPasswordViaUsername(username) {
  try {
    const response = await fetch(`${url}/api/v1/user/reset`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function resetPassword(resetToken,password) {
  try {
    const response = await fetch(`${url}/api/v1/user/verifytoken`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetToken , password }),
    })
    const data = await response.json();
      return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export {
  checkToken,
  loginUserViaEmail,
  loginUserViaUsername,
  getAccessToken,
  resetPasswordViaEmail,
  resetPasswordViaUsername,
  resetPassword
};
