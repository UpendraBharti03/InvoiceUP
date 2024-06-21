import axios from 'axios';
import { API_BASE_URL } from '@/services';

export const healthCheckRequest = () => axios.get(`${API_BASE_URL}/health-check`);