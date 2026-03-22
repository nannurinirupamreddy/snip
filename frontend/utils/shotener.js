import axios from './axios';
import { create } from 'zustand';

const useShortenerStore = create((set) => ({
  shortenedUrl: '',
  shortenUrl: async (url) => {
    try {
        const res = await axios.post('/', { longUrl: url });
        if (res.data) {
            set({ shortenedUrl: res.data.shortUrl });
        }
    } catch (error) {
        console.error('Error shortening URL:', error);
    }
  }
}));

export default useShortenerStore;