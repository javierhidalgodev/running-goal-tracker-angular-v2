import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { ToasterComponent } from './components/toaster/toaster.component';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [AppComponent, ToasterComponent, NotificationComponent],
  imports: [BrowserModule, AppRoutingModule, CdkPortalOutlet],
  providers: [
    provideFirebaseApp(() =>
      initializeApp(environment.firebase)
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
