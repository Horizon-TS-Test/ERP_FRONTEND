import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from 'src/app/interfaces/title.interface';
import { MainPanelOption } from 'src/app/interfaces/main-pan-option';
import mainPanel from 'src/app/data/main-panel';
import { TabWindowService } from 'src/app/services/tab-window.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit, OnDestroy {
  private subscriber: Subscription;

  public mainTitle: Title;
  public mainPanOptions: MainPanelOption[];

  constructor(
    private _tabWindowService: TabWindowService
  ) {
    this.mainTitle = { text: 'Panel Principal', icon: 'home' };
    this.mainPanOptions = mainPanel;
  }

  ngOnInit() {
    this.openWindowByRequest();
  }

  /**
   * METODO PARA ABRIR UNA VENTANA BAJO DEMANDA DESDE UN BEHAVIOUR SUBJECT
   */
  private openWindowByRequest() {
    this.subscriber = this._tabWindowService.openWinById$.subscribe((windowId: string) => {
      let index = this.mainPanOptions.findIndex(option => option.id == windowId);
      if (index !== -1) {
        this.openFloatWindow(null, index);
      }
    });
  }

  /**
   * METODO PARA ABRIR UNA VENTANA FLOTANTE
   */
  public openFloatWindow(event: any, mainOpIndex: number) {
    if (event) {
      event.preventDefault();
    }
    this._tabWindowService.loadOrMaximizeWindow(this.mainPanOptions[mainOpIndex]);
  }

  /**
   * METODO PARA PREVENIR EL CLICK DERECHO EN LOS ENLACES:
   * @param event
   */
  public onRightClick(event: any) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
