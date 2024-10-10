"use server"

import { POSTS_URL, USERS_URL } from "@/constants"
import { UserFormData } from "@/lib/types"
import axios from "axios"

export const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json"
  }
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && error.response.status !== 200) {
      console.error("Network response was not ok", error)
    }
    return Promise.reject(error)
  }
)

export const fetchUsersData = async () => {
  const response = await instance.get(USERS_URL)
  return response.data
}

export const fetchUserData = async (id: number) => {
  const response = await instance.get(USERS_URL + "/" + id)
  return response.data
}

export const postUserFormData = async (data: UserFormData) => {
  const response = await instance.post(POSTS_URL, data)
  return response.data
}

export const fetchBlogs = async (page = 1, limit = 10) => {
  const response = await instance.get(`${POSTS_URL}?_start=${(page - 1) * limit}&_limit=${limit}`)
  return response.data
}
