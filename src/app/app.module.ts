import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { SharedModule } from '@shared/shared.module';

const imports = [
  BrowserModule,
  AppRoutingModule,
  SharedModule,
  CdkPortalOutlet
]

@NgModule({
  declarations: [
    AppComponent,
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
