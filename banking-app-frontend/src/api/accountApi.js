// src/api/accountApi.js
import axiosInstance from './axiosInstance';

export const createAccount = async (customerId, accountData) => {
  const response = await axiosInstance.post(`/customers/${customerId}/accounts`, accountData);
  return response.data;
};

export const getAccountById = async (accountId) => {
  const response = await axiosInstance.get(`/accounts/${accountId}`);
  return response.data;
};