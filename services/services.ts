"use server"

import axios from "axios"

export const fetchUsersData = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users")
  if (response.status !== 200) {
    throw new Error("Network response was not ok")
  }
  return response.data
}

export const fetchUserData = async (id: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  if (response.status !== 200) {
    throw new Error("Network response was not ok")
  }
  return response.data
}

export const fetchBlogs = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${(page - 1) * limit}&_limit=${limit}`
  )
  if (response.status !== 200) {
    throw new Error("Network response was not ok")
  }
  return response.data
}
