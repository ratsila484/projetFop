import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFile, faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import { FileExplorerService } from '../../services/file-explorer.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-body-commun',
  imports: [MatListModule,FontAwesomeModule],
  templateUrl: './body-commun.component.html',
  styleUrl: './body-commun.component.css'
})
export class BodyCommunComponent implements OnInit{
  constructor(private dialog: MatDialog,private fileService : FileExplorerService){};
  directory = 'D:'; //repertoire initial
  files: any[] = [];
  fileIcon = faFile;
  folderIcon = faFolder;
 
  //lister les fichiers
  listFiles() {
    this.fileService.getFiles(this.directory).subscribe((data) => {
      this.files = data;
    })
  }

  ngOnInit(): void {
    this.listFiles();
  }

  //Afficher le contenu d'un fichier
  viewFile(path: string) {
    // Récupérer le contenu du fichier via le service
    this.fileService.getFileContent(path).subscribe((data) => {
      // Ouvrir le popup avec le contenu du fichier
      this.dialog.open(DialogContentComponent, {
        width: '600px',
        height: '900px',
        data: { message: data.content }, // Passer le contenu du fichier dans les données
      });
    });
  }

  returnView(file: any) {
    if (file.isDirectory) {
      this.directory = this.directory + '\\';
      this.listFiles();
    }
  }

  navigateOrView(file: any) {
    if (file.isDirectory) {
      this.directory = this.directory + '\\' + file.name;
      this.listFiles();
    } else {
      this.viewFile(this.directory + '\\' + file.name);
    }
  }
}
