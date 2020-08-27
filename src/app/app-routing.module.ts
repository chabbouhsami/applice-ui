import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeArticleComponent } from './components/article/type/type-article.component';
import { TypeContratComponent } from './components/contrat/type-contrat.component';
import { LoginComponent } from './components/login/login.component';
import { RgComponent } from './components/rg/rg.component';
import { UsersComponent } from './components/users/users.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogginGuard } from './core/services/login/loggin.guard';
import { SalarieComponent } from './components/salarie/salarie.component';
import { ArticleComponent } from './components/article/article/article.component';
import { ApprovisionnementComponent } from './components/approvisionnement/approvisionnement/approvisionnement.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'rg', component: RgComponent, canActivate: [LogginGuard] },
  {
    path: 'typcon',
    component: TypeContratComponent,
    canActivate: [LogginGuard],
  },
  {
    path: 'typart',
    component: TypeArticleComponent,
    canActivate: [LogginGuard],
  },
  {
    path: 'salarie',
    component: SalarieComponent,
    canActivate: [LogginGuard],
  },
  { path: 'users', component: UsersComponent, canActivate: [LogginGuard] },
  {
    path: 'approvisionnement',
    component: ApprovisionnementComponent,
    canActivate: [LogginGuard],
  },
  { path: 'articles', component: ArticleComponent, canActivate: [LogginGuard] },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
