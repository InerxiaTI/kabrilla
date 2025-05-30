import { kubernetesService } from '../clients/KubernetesClient';
import { PodResponseDto } from '../types/kubernetes'

export class PodService {

  async listPods(namespace: string): Promise<PodResponseDto[]> {
    console.log("Obteniendo pods de namespace: "+namespace);
    const pods = await kubernetesService.getPods(namespace);
    return pods;
  }

  async getPodLogs(namespace: string, pod: string): Promise<string> {
    console.log("Obteniendo logs de "+pod);
    const logs = await kubernetesService.getLogs(namespace, pod);
    console.log("logs de pod: "+logs);
    
    return logs
  }
  
}
