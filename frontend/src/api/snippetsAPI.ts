import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api/snippets', // Backend endpoint base URL
});

// Fetch all snippets (GET)
export const getSnippets = async () => {
  const response = await api.get('/');
  return response.data;
};

// Fetch a single snippet by ID (GET)
export const getSnippetById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Create a new snippet (POST)
export const createSnippet = async (snippet: any) => {
  const response = await api.post('/', snippet);
  return response.data;
};

// Update an existing snippet (PUT)
export const updateSnippet = async (id: string, snippet: any) => {
  const response = await api.put(`/${id}`, snippet);
  return response.data;
};

// Delete a snippet (DELETE)
export const deleteSnippet = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
