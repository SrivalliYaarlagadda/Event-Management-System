// // app/utils/auth.ts

// // Save token in localStorage (client side)
// export const saveToken = (token: string) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("auth_token", token);
//   }
// };

// // Get token from localStorage (client side)
// export const getToken = () => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("auth_token");
//   }
//   return null;
// };

// // Clear token (logout)
// export const clearToken = () => {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem("auth_token");
//   }
// };
export const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
};

// Check if logged in
export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return getToken() !== null;
};
