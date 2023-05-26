import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080/",
});

export const postCheckRegister = async (path, infor = {}) => {
  const response = await request.post(path, infor);
  return response.data;
};

export const getListUser = async (path , header = {}) => {
    const response = await request.get(path, header);
    return response.data;
}



export const postCheckLogin = async (path, infor = {}) => {
    const response = await request.post(path, infor);
    return response.data;
}

export const postAddUserRole = async (path, infor = {}) => {
  const response = await request.post(path, infor);
  return response.data;
}

export const getListProduct = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getListBrand = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}


export const getProductByBrand = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getInforProduct = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}


export const getUserByRole = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getOrderDetail = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getOrders = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getProductsDetail = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getPageProduct = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getPageProductDetail = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getProductByName = async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getOrderDetailByUsername= async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getOrdersByUsername= async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getProductDetailsByProductname= async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getCustomerByName= async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getManagerByName= async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const getEmployeeByName= async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

export const updateStatusCustomer= async (path , infor = {}) => {
  const response = await request.post(path, infor);
  return response.data;
}

export const getManagerByUsernameAndRoleOne= async (path , infor = {}) => {
  const response = await request.get(path, infor);
  return response.data;
}

