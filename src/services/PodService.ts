import { kubernetesService } from '../clients/KubernetesClient';
import { PodResponseDto } from '../types/kubernetes'
import { invoke } from '@tauri-apps/api/core';




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

  // streamLogs(namespace: string, pod: string, onData: (line: string) => void, onError?: (err: string) => void) {
    
  //   const event = `log_stream_${namespace}_${pod}`;
  //   window.__TAURI__.event.listen<string>(event, (e) => {
  //     onData(e.payload);
  //   });

  //   this.invoke("stream_logs", { namespace, pod, event })
  //     .catch(err => onError?.(err.toString()));
  // }
}
