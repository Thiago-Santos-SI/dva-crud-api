import axios from "axios";

export const createItem = ({ title, body }) => {
  return axios.post("http://localhost:3333/posts",{
    title: title,
    body: body
  })
}

export const fetchItems = () => {
  const res = axios.get("http://localhost:3333/posts");
  return res
};
