import axios from 'axios';

const fetcher = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true
});

export const getAmount = async () => {
    try {
        const { data } = await fetcher.get(`/donation/amount`);
        return data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getDonors = async () => {
    try {
        const { data } = await fetcher.get(`/donation/donors`);
        return data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const postDonation = async (amount) => {
    try {
        const { data } = await fetcher.post(`/donation`, {amount});
        return data
    } catch (error) {
        console.log(error)
        throw error;
    }
}