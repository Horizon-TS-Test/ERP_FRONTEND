import { Component, ViewChild, ViewContainerRef, OnDestroy, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DynaContent } from '../../interfaces/dyna-content.interface';
import { HorizonPopOverComponent } from '../horizon-pop-over/horizon-pop-over.component';
import { DynaContentService } from 'src/app/services/dyna-content.service';

@Component({
  selector: 'content-layer',
  templateUrl: './content-layer.component.html',
  styleUrls: ['./content-layer.component.scss']
})
export class ContentLayerComponent implements OnInit, OnDestroy {
  @ViewChild("secodaryLayer", { read: ViewContainerRef }) secondaryLayer: ViewContainerRef;

  private subscription: Subscription;

  constructor(
    private _DynaContentService: DynaContentService,
    private _cfr: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    //SUBSCRIPTION TO ADD NEW CONTENT LAYER DINAMICALLY:
    this.subscription = this._DynaContentService.dynaWindowData$.subscribe(
      (dynaContent: DynaContent) => {
        if (!dynaContent) {
          return;
        }
        this.addComponent(HorizonPopOverComponent, this._cfr, this.secondaryLayer, dynaContent);
      }
    );
    ////
  }

  /**
   * METODO PARA AÑADIR DINÁMICAMENTE UN COMPONENTE E INCRUSTARLO EN EL DOM A TRAVÉS DE CÓDIGO TYPESCRIPT:
   */
  private addComponent(ChildComponent: any, cfr: ComponentFactoryResolver, compContainer: ViewContainerRef, dynaContent: DynaContent = null) {
    // check and resolve the component
    let component = cfr.resolveComponentFactory(ChildComponent);
    // Create component inside container
    let expComp: any = compContainer.createComponent(component);
    let compInstance: any = expComp.instance;
    compInstance._ref = expComp;

    switch (dynaContent.contentType) {
      /*case CONTENT_TYPES.alert:
        compInstance.alertData = dynaContent.contentData;
        break;*/
      default:
        compInstance._dynaContent = dynaContent;
        compInstance._selfInstance = compInstance;
        break;
    }
  }
  ////

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
