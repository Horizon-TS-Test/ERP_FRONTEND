import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OwlModule } from 'ngx-owl-carousel';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//ROUTES
import { routing, appRoutingProviders } from './app.routing';
////
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ErrorComponent } from './components/error/error.component';

import { AlertComponent } from './components/alert/alert.component';
import { ContentLayerComponent } from './components/content-layer/content-layer.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { PortadaComponent } from './components/portada/portada.component';
import { Select2BootstrapComponent } from './components/select2-bootstrap/select2-bootstrap.component';
import { HorizonModalComponent } from './components/horizon-modal/horizon-modal.component';
import { MaterialButtonComponent } from './components/material-button/material-button.component';
import { MaterialBtnListComponent } from './components/material-btn-list/material-btn-list.component';
import { ImgViewerComponent } from './components/img-viewer/img-viewer.component';
import { HorizonNotificationComponent } from './components/horizon-notification/horizon-notification.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { ProfileLinkComponent } from './components/profile-link/profile-link.component';
import { ProfileOwnerComponent } from './components/profile-owner/profile-owner.component';
import { HorizonPopOverComponent } from './components/horizon-pop-over/horizon-pop-over.component';
import { HorizonSwitchInputComponent } from './components/horizon-switch-input/horizon-switch-input.component';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { InstallSliderComponent } from './components/install-slider/install-slider.component';
import { HorizonSwitchInListComponent } from './components/horizon-switch-in-list/horizon-switch-in-list.component';
import { UnavaliableComponent } from './components/unavaliable/unavaliable.component';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { StepsComponent } from './components/steps/steps.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HomePanelComponent } from './components/home-panel/home-panel.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { HorizonTitleComponent } from './components/horizon-title/horizon-title.component';
import { HorizonTitleBtnListComponent } from './components/horizon-title-btn-list/horizon-title-btn-list.component';
import { HorizonTabComponent } from './components/horizon-tab/horizon-tab.component';
import { TabWindowService } from './services/tab-window.service';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { FormViewComponent } from './components/form-view/form-view.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { DynamicFormInputComponent } from './components/dynamic-form-input/dynamic-form-input.component';
import { PopOverMenuComponent } from './components/pop-over-menu/pop-over-menu.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CarouselContainerComponent } from './components/carousel-container/carousel-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    ErrorComponent,
    AlertComponent,
    ContentLayerComponent,
    MainNavComponent,
    PortadaComponent,
    Select2BootstrapComponent,
    HorizonModalComponent,
    MaterialButtonComponent,
    MaterialBtnListComponent,
    ImgViewerComponent,
    HorizonNotificationComponent,
    NotificationListComponent,
    ProfileLinkComponent,
    ProfileOwnerComponent,
    HorizonPopOverComponent,
    HorizonSwitchInputComponent,
    DebounceClickDirective,
    InstallSliderComponent,
    HorizonSwitchInListComponent,
    StepsComponent,
    HorizonSwitchInListComponent,
    UnavaliableComponent,
    NotificationModalComponent,
    LoaderComponent,
    HomePanelComponent,
    MainPanelComponent,
    HorizonTitleComponent,
    HorizonTitleBtnListComponent,
    HorizonTabComponent,
    EmpresaComponent,
    ActionButtonsComponent,
    FormViewComponent,
    DetailViewComponent,
    TableViewComponent,
    DynamicFormInputComponent,
    PopOverMenuComponent,
    ContextMenuComponent,
    CarouselContainerComponent,
    InventarioComponent,
    MarcaComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    AngularFontAwesomeModule,
    OwlModule,
    ServiceWorkerModule.register('/sw-workbox.js', { enabled: environment.production })
  ],
  providers: [appRoutingProviders, UserService, TabWindowService],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent, HorizonModalComponent, HorizonNotificationComponent, HorizonPopOverComponent, MarcaComponent]
})
export class AppModule { }
