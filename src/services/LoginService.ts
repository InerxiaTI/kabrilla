import { kubernetesService } from '../clients/KubernetesClient';
import { AwsCredentials } from '../types/kubernetes'

export class LoginService {

  async setCredentials(credenciales: AwsCredentials): Promise<string> {
    console.log("Obteniendo logs de "+credenciales);
    const logs = await kubernetesService.sendCredentials(credenciales);
    console.log("logs de pod: "+logs);
    
    return "Guardadas"
  }
  
}