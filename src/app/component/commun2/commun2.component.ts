
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, isDevMode, viewChild } from '@angular/core';
import { FileExplorerService } from '../../services/file-explorer.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faArrowLeft, faArrowRight, faArrowUp, faBars, faBarsStaggered, faDownload, faDownLong, faFile, faFileAlt, faFileInvoice, faFolder, faHandPointDown, faHome, faRefresh, faSearch, faSort, faSortAlphaDownAlt, faSortDown, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faCut } from '@fortawesome/free-solid-svg-icons';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import { faTextSlash } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { HistoryService } from '../../services/history.service';
import { UploadServiceTsService } from '../../service/upload.service.ts.service';

import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { exit } from 'process';
import { DialogYesNoComponent } from '../dialog-yes-no/dialog-yes-no.component';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { DialogPropertyComponent } from '../dialog-property/dialog-property.component';
import { DialogCreateFolderComponent } from '../dialog-create-folder/dialog-create-folder.component';
import { DialogRef } from '@angular/cdk/dialog';
import { FolderServiceService } from '../../service/folder-service.service';
import { NgClass } from '@angular/common';
import { timeInterval } from 'rxjs';
import { DownloadSuccessComponent } from '../download-success/download-success.component';
@Component({
  selector: 'app-commun2',
  imports: [
    FormsModule, MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    FontAwesomeModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule, SideBarComponent,
    MatProgressBarModule,
    NgClass
  ],
  templateUrl: './commun2.component.html',
  styleUrl: './commun2.component.css'
})
export class Commun2Component implements OnInit {
  @ViewChild('monCheckBox') monCheckBox!: ElementRef;
  searchText: string = ''; //stock la valeur recherche

  isBrowser: boolean = false;
  selectedFile: File | null = null;
  files: any[] = [];
  back = faArrowLeft;
  next = faArrowRight;
  up = faArrowUp;
  refresh = faRefresh;
  search = faSearch;
  add = faAdd;
  cut = faCut;
  copy = faCopy;
  paste = faPaste;
  rename = faTextSlash;
  trash = faTrash;
  trier = faSortAlphaDownAlt;
  fichier = faFile;
  dossier = faFolder;

  download = faDownload;
  menu = faBarsStaggered;
  upload = faUpload;
  isSelect = 'fileRow';
  history: string[] = []; // Tableau pour l'historique des répertoires
  contextMenuVisible = false;
  menuPosition = { x: '0px', y: '0px' };
  private holdTimeout: any;

  // Utilisateur connecté
  actual_user = "Rakoto";
  //folder
  folderData: { name: string, status: string } | null = null;

  constructor(
    private dialog: MatDialog,
    private fileService: FileExplorerService,
    private historyService: HistoryService,
    private renderer: Renderer2,
    private uploadService: UploadServiceTsService,
    private http: HttpClient,
    private folderService: FolderServiceService
  ) { }
  isChecked = false;

  filteredFiles: any[] = [];
  searchTerm: string = '';
  fileClass = "file-item dropdown-toggle";
  ngOnInit(): void {
    this.loadFiles();
    //console.log(this.searchText);
    //console.log(this.filtredFiles);
  }

  listeFiles: Array<ListeFile> = [];
  dejaSelectionner: boolean = false;
  onChecked() {
    //recuperation de l'objet file
    this.loadFiles();
    this.files.forEach(file => {
      this.listeFiles.push()
    });
  }

  loadFiles() {
    this.uploadService.getFiles().subscribe(
      response => {
        if (response.success) {
          this.files = response.files;
          this.filteredFiles = this.files; //initialiser filtredFiles avec tous les fichiers
        } else {
          console.error("Erreur de récupération des fichiers");
        }
      },
      error => console.error("Erreur :", error)
    );
  }

  searchInput() {
    if (this.searchTerm) {
      this.filteredFiles = this.files.filter(item =>
        item.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredFiles = this.files; // Si le terme de recherche est vide, afficher tous les fichiers
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  //filteredFiles: any[] = []; // Liste des fichiers filtrés
  selectedFilees: any[] = []; // Liste des fichiers sélectionnés
  private longPressTimeout: any; // Timer pour le clic long
  private longPressDuration: number = 1000; // Durée du clic long en millisecondes (1 seconde)

  // Démarrer la sélection
  startSelection(file: any) {
    this.longPressTimeout = setTimeout(() => {
      this.selectFile(file);
    }, this.longPressDuration);
  }



  // Arrêter la sélection
  endSelection(file: any) {
    clearTimeout(this.longPressTimeout); // Annuler le timer si le clic est trop court
  }

  // Annuler la sélection si la souris quitte l'élément
  cancelSelection() {
    clearTimeout(this.longPressTimeout);
  }

  // Ajouter le fichier à la liste des fichiers sélectionnés
  selectFile(file: any): boolean {
    if (!this.selectedFilees.includes(file)) {
      this.selectedFilees.push(file);
      this.longPressDuration = 1;
      return true
    } else {
      return false
    }
  }


  onToggleClass(file: any) {
    if (this.isSelected(file)) {
      return "file-item dropdown-toggle selected";
    } else {
      return "file-item dropdown-toggle";
    }
  }

  cancelAllSelected() {
    //vider la liste et rreenitialiser le timer
    this.selectedFilees.length = 0;
    this.longPressDuration = 1000;
  };


  // Vérifier si un fichier est sélectionné
  isSelected(file: any): boolean {
    if (file != null) {
      return this.selectedFilees.includes(file);
    } else {
      return false;
    };
  }
  uploadProgress: number = 0;
  onUpload() {
    if (!this.selectedFile) {
      alert("Veuillez sélectionner un fichier !");
      return;
    }

    const formData = new FormData();
    formData.append("file", this.selectedFile);
    formData.append("uploader", "NomUtilisateur");
    //formData.append("statut", this.statut);
    this.http.post("http://192.168.2.9/ftp/upload.php", formData).subscribe((response: any) => {
      if (response.success) {
        alert("Fichier uploadé !");
        this.loadFiles(); // Recharge la liste après l'upload
      } else {
        alert("Erreur : " + response.message);
      }
    });
  }


  deleteFile(fileId: number, fileName: string): void {
    //alert(fileId.toString());
    const formData = new FormData();
    formData.append("id", `${fileId}`);

    const mydialog = this.dialog.open(DialogYesNoComponent, {
      disableClose: true,
      data: {
        labelNo: "Non",
        labelYes: "Vas-y negaa",
        file: fileName,
        action: "Voulez-bous supprimer "
      }
    });
    mydialog.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        this.http.post('http://192.168.2.9/ftp/delete.php', formData).subscribe((response: any) => {
          if (response.success) {
            //alert("Fihcier supprimmer avec success");
            this.loadFiles();
          } else {
            //alert('Erreur: ' + response.message);
            this.dialog.open(DialogSuccessComponent);
            this.loadFiles();
          }
        }
        )

      }
    })
  }
  deleteAllSelected() {
    //alert(fileId.toString());
    this.selectedFilees.forEach(element => {
      const formData = new FormData();
      formData.append("id", `${element.id}`);

      const mydialog = this.dialog.open(DialogYesNoComponent, {
        disableClose: true,
        data: {
          labelNo: "Non",
          labelYes: "Vas-y negaa",
          action: "Voulez vous supprimer tous ces fichiers ??",
          filename: element.nom
        }
      });
      mydialog.afterClosed().subscribe(result => {
        //console.log(result);
        if (result) {
          this.http.post('http://192.168.2.9/ftp/delete.php', formData).subscribe((response: any) => {
            if (response.success) {
              //alert("Fihcier supprimmer avec success");
              this.loadFiles();
            } else {
              //alert('Erreur: ' + response.message);
              this.dialog.open(DialogSuccessComponent);
              this.loadFiles();
            }
          }
          )

        }
      })
    });
    //vider le liste et reenitialisation du timer
    this.selectedFilees.length = 0;
    this.longPressDuration = 1000;
  }
  formatNom(nom: string, maxLength: number = 10): string {
    if (nom.length <= maxLength) {
      return nom; // Pas besoin de tronquer si le nom est déjà court
    }

    const debut = nom.slice(0, Math.floor(maxLength / 2)); // Première moitié
    const fin = nom.slice(-Math.floor(maxLength / 2)); // Dernière moitié

    return `${debut}...${fin}`;
  }

  async Download(filename: string) {
    this.uploadService.downloadFile(filename);
  }

  async downloadAllSelected() {
    /*for(const element of this.selectedFilees){
      if(element.chemin){
        alert("telechargement de " + element.nom);
        this.Download(element.chemin);
      }
    }*/
    this.selectedFilees.forEach(element => {
      const link = document.createElement('a');
      link.href = `http://192.168.2.8/ftp/download.php?filename=${element.chemin}`;
      link.download = element.chemin;
      //ouvre un nlle onglt pour chaque fichier
      window.open(link.href, '_blank');
      link.click();
    });
    //vider la liste et rreenitialiser le timer
    this.selectedFilees.length = 0;
    this.longPressDuration = 1000;

  }



  openUploadDialog() {
    this.dialog.open(UploadDialogComponent, {
      disableClose: true,
      data : {
        uploaderName : this.actual_user
      }
    });
  }

  showProperty(fileName: string, path: string, uploader: string, taille: string,
    dateUpload: string, statut: string, type: string
  ) {
    this.dialog.open(DialogPropertyComponent, {
      data: {
        fileName: fileName,
        path: path,
        uploader: uploader,
        taille: taille,
        dateUpload: dateUpload,
        statut: statut,
        type: type
      }
    })
  }

  createFolder() {
    const dialogRef = this.dialog.open(DialogCreateFolderComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderData = result;
        const foldData = this.folderData;
        this.folderService.createFolder(this.folderData).subscribe({
          next: (response) => {
            console.log('Réponse du serveur :', response);
          },
          error: (error) => {
            console.error('Erreur HTTP :', error);
          }
        });
      }
    })
  }

  //fonction pour filtrer les fichiers
  get filtredFiles() {
    return this.files.filter(file => {
      file.nom.toLowerCase().includes(this.searchText.toLowerCase())
    });
  }




}

interface ListeFile {
  id: number,
  nom: string,
  chemin: string,
  taille: string,
  uploader: string,
  checked: boolean
}
