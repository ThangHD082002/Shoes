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
