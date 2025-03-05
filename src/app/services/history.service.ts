import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historyKey = 'navigationHistory';
  constructor() { }

  //Ajouter une nouvelle entree a l'historique
  addHistory(entry:any):void{
    const history = this.getHistory();
    history.push(entry);
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  //recuere l'historique complet
  getHistory(): any{
    const history = localStorage.getItem(this.historyKey);
    return history? JSON.parse(history) : [];
  }

  //effacer l'historique
  clearHistory() : void{
    localStorage.removeItem(this.historyKey);
  }
}
