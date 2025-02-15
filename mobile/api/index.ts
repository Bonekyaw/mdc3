import { API_URL } from "@/config";

export const fetchApi = async ({
  endpoint = "",
  data = {},
  method = "POST",
  headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  },
}) => {
  const url = API_URL + endpoint;
  const options = {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      let errorMessage = "An error occurs. Please try again.";
      try {
        const res = await response.json();
        errorMessage = res.message || errorMessage;
      } catch (err) {
        console.error(err);
      }
      // Show Toast Message
      return null;
    }
    return response.json();
  } catch (error) {
    // Show Toast Message
    console.error(error);
  }
};
