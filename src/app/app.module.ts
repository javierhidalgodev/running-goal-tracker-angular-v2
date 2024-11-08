import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { SharedModule } from '@shared/shared.module';
import { FooterComponent } from './core/layout/private-layout/components/footer/footer.component';
import { HeaderComponent } from './core/layout/private-layout/components/header/header.component';

const imports = [BrowserModule, AppRoutingModule, SharedModule, CdkPortalOutlet]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports,
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
