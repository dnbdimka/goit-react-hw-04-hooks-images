import axios from "axios";

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "23271163-2ca32ba12cffdc2e109d4f4b6";

export const getGallery = async (page, searchQuery) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const normalizeData = nomalizeData(response.data);

    return normalizeData;
  } catch (error) {
    console.log(error);
  }
};

const nomalizeData = ({ hits, total }) => {
  const normalizeData = hits.map((item) => ({
    id: item.id,
    smallImg: item.webformatURL,
    bigImg: item.largeImageURL,
  }));
  return { normalizeData, total };
};
