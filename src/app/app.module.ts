import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { SharedModule } from '@shared/shared.module';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { HomeComponent } from './core/layout/public-layout/home/home.component';
import { NgOptimizedImage } from '@angular/common';

const imports = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  SharedModule,
  CdkPortalOutlet,
  NgOptimizedImage
]

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    HomeComponent,
  ],
  imports,
  providers: [
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() =>
      initializeFirestore(
        getApp(), { }
      )
    )
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
