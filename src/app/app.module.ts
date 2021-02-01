import { HttpClient, HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { WebStorageModule } from 'ngx-store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSiteComponent } from './components/app-site/app-site/app-site.component';
import { ApprovisionnementComponent } from './components/approvisionnement/approvisionnement/approvisionnement.component';
import { ArticleComponent } from './components/article/article/article.component';
import { AlerteComponent } from './components/article/stock/alerte/alerte.component';
import { StockComponent } from './components/article/stock/stock.component';
import { TypeArticleComponent } from './components/article/type/type-article.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { TypeContratComponent } from './components/contrat/type-contrat.component';
import { LoginComponent } from './components/login/login.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { MessageModalComponent } from './components/message/message-modal/message-modal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RgComponent } from './components/rg/rg.component';
import { SalarieComponent } from './components/salarie/salarie.component';
import { UsersComponent } from './components/users/users.component';
import { VenteComponent } from './components/vente/vente/vente.component';
import { HeaderComponent } from './menu/header/header.component';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RgComponent,
    TypeContratComponent,
    TypeArticleComponent,
    MenuComponent,
    MenuItemComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    SalarieComponent,
    ArticleComponent,
    ApprovisionnementComponent,
    VenteComponent,
    MessageModalComponent,
    CartComponent,
    AppSiteComponent,
    StockComponent,
    AlerteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    WebStorageModule,
    TooltipModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
