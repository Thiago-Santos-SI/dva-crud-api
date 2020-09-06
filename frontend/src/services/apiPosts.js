import axios from "axios";

export const createItem = ({ title, body }) => {
  return axios.post("http://localhost:3333/posts",{
    title: title,
    body: body
  })
}

export const fetchItems = async () => {
  const { data } = await axios.get("http://localhost:3333/posts");
  console.log(data)
  return data
};
