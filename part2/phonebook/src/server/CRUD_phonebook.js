import axios from "axios";

const base_URL = "http://localhost:3001/persons";

export const getAll = async () => {
  const request = await axios.get(base_URL);
  return request.data;
};

export const create = async (newNumber) => {
  const request = await axios.post(base_URL, newNumber);
  return request.data;
};

export const update = async (id, person) => {
  const request = await axios.put(`${base_URL}/${id}`, person);
  return request.data;
};

export const deletePerson = async (id) => {
  await axios.delete(`${base_URL}/${id}`);
};
