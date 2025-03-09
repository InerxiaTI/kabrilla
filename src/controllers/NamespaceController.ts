// src/controllers/NamespaceController.ts
import { FileService } from '../services/FileService';
import { Namespace } from '../types/Namespace';

export class NamespaceController {
  private fileService: FileService;

  constructor(fileService: FileService) {
    this.fileService = fileService;
  }

  async getNamespaces(): Promise<Namespace[]> {
    console.log("en el controller");
    
    return this.fileService.readJsonFile<Namespace[]>('namespaces.json', []);
  }

  async saveNamespaces(namespaces: Namespace[]): Promise<void> {
    await this.fileService.writeJsonFile<Namespace[]>('namespaces.json', namespaces);
  }

  async saveNamespace(namespace: Namespace): Promise<void> {
    const allNamespaces: Namespace[] = await this.getNamespaces();
    console.log("old all ns: "+JSON.stringify(allNamespaces));
    
    allNamespaces.push(namespace)
    console.log("newnamesspace: "+JSON.stringify(allNamespaces));
    await this.saveNamespaces(allNamespaces);
  }
}