import axios from "axios";

const SERVER_URL = "http://localhost:9000";
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`
    return axios.get(url)

}
export const getContact = (id) => {
    return axios.get(`${SERVER_URL}/contacts/${id}`)
}
export const getAllGroups = () => {
    return axios.get(`${SERVER_URL}/groups`)
}
export const getGroup = (groupId) => {
    return axios.get(`${SERVER_URL}/groups/${groupId}`)
}
export const createContact = (contact) => {
    return axios.post(`${SERVER_URL}/contacts`, contact)
}
export const editContact = (id, contact) => {
    return axios.put(`${SERVER_URL}/contacts/${id}`, contact)
}
export const removeContact = (id) => {
    return axios.delete(`${SERVER_URL}/contacts/${id}`)
}
