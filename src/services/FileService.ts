// src/services/FileService.ts
import { appDataDir, homeDir } from '@tauri-apps/api/path';
import { exists, create, writeTextFile, readTextFile, BaseDirectory, mkdir } from '@tauri-apps/plugin-fs';

export class FileService {
  private async getFilePath(filename: string): Promise<string> {
    const appDataDirPath: string = await appDataDir();  
    console.log("appdata dir: "+appDataDirPath);
    
    const dataDirPath: string = `${appDataDirPath}\\data`;
    console.log(" 2 dataDirPath: "+dataDirPath);

    if (!(await exists(dataDirPath))) {
      //await createDir(dataDirPath);
      console.log("creando...");
      await mkdir(dataDirPath, {recursive: true})
      console.log("carpeta creada"); 
      
      //const file = await create(dataDirPath);
      const file = await create(dataDirPath+"\\"+filename);
      await file.write(new TextEncoder().encode('Hello world'));
      await file.close();
    }else{
      console.log("ya existe: "+dataDirPath); 
    }
    return `${dataDirPath}\\${filename}`; 
  }

  async readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {

    const filePath = await this.getFilePath(filename);

    console.log("====== 0 filepath: "+filePath);
    
    if (!(await exists(filePath))) {
      console.log("====== 1 filepath: "+filePath);

      await this.writeJsonFile(filename, defaultValue);
      return defaultValue;
    }
    console.log("====== 2 filepath existe: "+filePath);

    const content = await readTextFile(filePath);
    console.log("content: "+JSON.stringify(content));
    let json = [];
    try {
      json = JSON.parse(content)
    } catch (error) {
      console.error(error);
      return json;
    }

    return json;
  }

  async writeJsonFile<T>(filename: string, data: T): Promise<void> {
    console.log("escribiendo...");
    const filePath = await this.getFilePath(filename);
    console.log("obtenido el filepath: "+filePath);
    
    await writeTextFile(filePath, JSON.stringify(data));
  }
}