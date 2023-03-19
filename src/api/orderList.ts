import { axiosInstance } from './client';

const orderListApi = {
  async getData() {
    const { data } = await axiosInstance.get('data/mock_data.json');

    return data;
  },
};

export default orderListApi;
