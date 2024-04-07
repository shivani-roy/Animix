import axios from "axios";
const baseUrl = "https://api.jikan.moe/v4";

export const fetchData = async (url, params) => {
  // console.log("url " + url, "base= " + baseUrl, params);

  try {
    const response = await axios.get(`${baseUrl}${url}`, { params });
    const { data } = response.data;
    // const { data } = await response.json();

    console.log(url, data);
    if (url.includes("q=") || url.includes("page")) {
      return response.data;
    }

    return data;
  } catch (error) {
    console.log(error);

    if (error.response.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetchData(url);
    }
    return error;
  }
};
