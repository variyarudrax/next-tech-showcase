import axios from "axios"

export const fetchPosts = async () => {
  const response = await axios.get("http://localhost:3001/posts")
  return response.data
}
