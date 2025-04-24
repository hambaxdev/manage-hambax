// authFetch.js

export const refreshAccessToken = async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Не удалось обновить токен");
  
      const data = await response.json();
      localStorage.setItem("access_token", data.accessToken);
      return data.accessToken;
    } catch (err) {
      console.error("Ошибка обновления токена", err);
      return null;
    }
  };
  
  export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("access_token");
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (response.status === 401) {
      const newToken = await refreshAccessToken();
  
      if (newToken) {
        const retryResponse = await fetch(url, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
        return retryResponse;
      } else {
        // Refresh не сработал — удаляем токены и выходим
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }
  
    return response;
  };
  