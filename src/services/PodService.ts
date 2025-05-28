import { Pod } from '../types/Pod'
import { invoke } from '@tauri-apps/api/core';


export class PodService {
  async listPods(namespace: string): Promise<String[]> {
    console.log("Obteniendo pods de namespace: "+namespace);

    return invoke("get_pods", { namespace });
  }

  async getPodLogs(namespace: string, pod: string): Promise<string> {
    console.log("Obteniendo logs de "+pod);
    
    return invoke("get_logs", { namespace, pod});
  }

  streamLogs(namespace: string, pod: string, onData: (line: string) => void, onError?: (err: string) => void) {
    
    /*const event = `log_stream_${namespace}_${pod}`;
    window.__TAURI__.event.listen<string>(event, (e) => {
      onData(e.payload);
    });

    this.invoke("stream_logs", { namespace, pod, event })
      .catch(err => onError?.(err.toString()));*/
  }
}
