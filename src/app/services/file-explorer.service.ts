import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileExplorerService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtenir la liste des fichiers
  getFiles(dir: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/files?dir=${encodeURIComponent(dir)}`);
  }

  //telecharger un fichier 
  downloadFile(filePath:string){
    const url = `${this.baseUrl}/download?path=${filePath}`;
    return this.http.get(url,{responseType: 'blob'});
  }

  //Uploader un fichier
  uploadFile(file:File):Observable<any>{
    const formData = new FormData();
    formData.append('file',file);

    return this.http.post(`${this.baseUrl}/upload`,formData);
  }

  // Lire le contenu d'un fichier
  getFileContent(filePath: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/file-content?path=${encodeURIComponent(filePath)}`);
  }

  /* navigateOrView(filepath:string) : Observable<any>{
    //verifier si c'est un dossier ou un fichier en appelant le bon endpoint
    if(filepath.endsWith('/')){
      return this.http.get(`${this.baseUrl}/files?dir=${encodeURIComponent(filepath)}`);
    }else{
      return this.http.get(`${this.baseUrl}/file-content?path=${encodeURIComponent(filepath)}`);
    }
  } */


}
