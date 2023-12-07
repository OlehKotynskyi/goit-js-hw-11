import Notiflix from 'notiflix';
import axios from "axios";

const apiKey = '41009767-6f834ab34244f7e5a2820a6e0';
const axiosOptions = {
   key: apiKey,
   image_type: 'photo',
   orientation: 'horizontal',
   safesearch: true,
   per_page: 40,
};

export async function gettingApiImages(query, page) {
   try {
      const response = await axios.get('https://pixabay.com/api/', {
         params: {
            ...axiosOptions,
            q: query,
            page: page
         }
      });
      return response.data;
   } catch (error) {
      Notiflix.Notify.failure('Sorry, there are problems with API.');
      throw new Error(error);
   }
};
