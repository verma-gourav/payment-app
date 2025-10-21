import axiosClient from "./axiosClient";

export const transactionApi = {
  list: (accountId: string) =>
    axiosClient.get(`/transactions/mytransactions?accountId=${accountId}`),
  sendMoney: (data: any) => axiosClient.post("/transactions/create", data),
};
