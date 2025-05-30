import axios from 'axios';
import { PodResponseDto } from '../types/kubernetes';
import { kubernetesApi } from '../config/AxiosInstance';


class KubernetesService {

  public async getPods(namespace: string): Promise<PodResponseDto[]> {
    try {
      const response = await kubernetesApi.get<PodResponseDto[]>('/v1/kubernetes/pods', {
        params: {
          namespace: namespace,
        },
      });
      return response.data;
    } catch (error) {
      // It's good practice to handle errors, e.g., log them or throw a more specific error.
      if (axios.isAxiosError(error)) {
        console.error('Error fetching pods:', error.message);
        // You might want to throw a custom error here or handle it in the component
        throw new Error(`Failed to fetch pods: ${error.response?.statusText || error.message}`);
      } else {
        console.error('An unexpected error occurred:', error);
        throw new Error('An unexpected error occurred while fetching pods.');
      }
    }
  }

  
  public async getLogs(namespace: string, podName: string): Promise<string> {
    try {
      const response = await kubernetesApi.get<string>('/v1/kubernetes/logs', {
        params: {
          namespace: namespace,
          podName: podName
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching logs:', error.message);
        // You might want to throw a custom error here or handle it in the component
        throw new Error(`Failed to fetch logs: ${error.response?.statusText || error.message}`);
      } else {
        console.error('An unexpected error occurred:', error);
        throw new Error('An unexpected error occurred while fetching pods.');
      }
    }
  }

}

export const kubernetesService = new KubernetesService();