import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAgentBoard() {
    return axios.get(API_URL + 'agent/dashboard', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin/dashboard', { headers: authHeader() });
  }
}

export default new UserService();