import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';
import { HomeComponent } from './public/components/home/home.component';
import { CoachListComponent } from './public/components/coach-list/coach-list.component';
import { CoachDetailsComponent } from './public/components/coach-details/coach-details.component'; // Import the CoachDetailsComponent
import { UserProfileComponent } from './public/components/user-profile/user-profile.component';
import { FavoriteCoachesComponent } from './public/components/favorite-coaches/favorite-coaches.component';
import { SubscriptionComponent } from './public/components/subscription/subscription.component';
import { PaymentComponent } from './public/components/payment/payment.component';


const routes: Routes = [
  
  {
    // Lazy Loading the public module (all children routes will be under '/public/{route from lazy loaded module}')
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    // Lazy Loading the protected module (all children routes will be under '/protected/{route from lazy loaded module}')
    // The guard will check if the user is having a jwt, otherwise he will be redirected to the base route
    path: 'protected',
    canActivate: [AuthGuard],
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)
  },
  {
    path: 'home', // Add a path for the home component
    component: HomeComponent
  },
  {
    path: 'coach', // Add a path for the home component
    component: CoachListComponent
  },
  {
    path: 'user-profile', // Add a path for the home component
    component: UserProfileComponent
  },
  {
    path: 'fav', // Add a path for the home component
    component: FavoriteCoachesComponent
  },
  {
    path: 'sub', // Add a path for the home component
    component: SubscriptionComponent
  },
  { path: 'payment', component: PaymentComponent },
  {
    path: 'coach/:coachId', // Dynamic route parameter for coachId
    component: CoachDetailsComponent, // This component will display detailed information about the coach
  },

  {
    // Redirects all paths that are not matching to the 'public' route/path
    path: '**',
    redirectTo: 'public',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
