import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';
import { HomeComponent } from './public/components/home/home.component';
import { CoachListComponent } from './public/components/coach-list/coach-list.component';
import { CoachDetailsComponent } from './public/components/coach-details/coach-details.component'; // Import the CoachDetailsComponent
import { UserProfileComponent } from './public/components/ApiComponent/user-profile/user-profile.component';
import { SubscriptionComponent } from './public/components/subscription/subscription.component';
import { CoachesComponent } from './public/components/ApiComponent/coaches/coaches.component';
import { CoachesDetailComponent } from './public/components/ApiComponent/coaches-detail/coaches-detail.component';
import { SubscribeComponent } from './public/components/ApiComponent/subscribe/subscribe.component';
import { RegisterComponent } from './public/components/ApiComponent/register/register.component';
import { CheckoutComponent } from './public/components/ApiComponent/checkout/checkout.component';
import { CalCalculatecaloryComponent } from './public/components/ApiComponent/cal-calculatecalory/cal-calculatecalory.component';
import { EmailConfirmationComponent } from './public/components/ApiComponent/email-confirmation/email-confirmation.component';
import { AccountService } from './public/services/ApIServices/account.service';
import { LoginComponent } from './public/components/ApiComponent/login/login.component';
import { LogoutComponent } from './public/components/ApiComponent/logout/logout.component';
import { LoginUserComponent } from './public/components/ApiComponent/login-user/login-user.component';
import { MeasurementComponent } from './public/components/ApiComponent/measurement/measurement.component';
import { MeasurementPostComponent } from './public/components/ApiComponent/measurement-post/measurement-post.component';
import { DeleteMeasurementComponent } from './public/components/ApiComponent/delete-measurement/delete-measurement.component';
import { AccountSettingComponent } from './public/components/ApiComponent/account-setting/account-setting.component';
import { ConfirmChangeEmailComponent } from './public/components/ApiComponent/confirm-change-email/confirm-change-email.component';
import { CoachHomeComponent } from './public/components/ApiComponent/coach-home/coach-home.component';
import { CreateSubscribtionComponent } from './public/components/ApiComponent/create-subscribtion/create-subscribtion.component';
import { FavoriteCoachesComponent } from './public/components/ApiComponent/favorite-coaches/favorite-coaches.component';
import { AthleteSubscriptionComponent } from './public/components/ApiComponent/athlete-subscription/athlete-subscription.component';
import { ResetPasswordComponent } from './public/components/ApiComponent/reset-password/reset-password.component';
import { ConfirmResetComponent } from './public/components/ApiComponent/confirm-reset/confirm-reset.component';
import { CoachSubscriptionComponent } from './public/components/ApiComponent/coach-subscription/coach-subscription.component';
import { SiteInfoComponent } from './public/components/ApiComponent/site-info/site-info.component';


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
    path: 'homenav', // Add a path for the home component
    component: CoachHomeComponent
  },
  
  {
    path: 'measurementget', // Add a path for the home component
    component: MeasurementComponent
  },
  {
    path: 'measurementpost', // Add a path for the home component
    component: MeasurementPostComponent
  },
  {
    path: 'loginuser', // Add a path for the home component
    component: LoginUserComponent
  },
  {
    path: 'coaches',
    component: CoachesComponent
  },
  { 
    path: 'coachdetail/:id',
     component: CoachesDetailComponent
  },
  { 
    path: 'subscribe', 
    component: SubscribeComponent 
  },
  { 
    path: 'logoutme', 
    component: LogoutComponent 
  },
  { 
    path: 'accountsetting', 
    component: AccountSettingComponent 
  },
  { 
    path: 'deletemeasurement', 
    component: DeleteMeasurementComponent 
  },
  { 
    path: 'subscribe/:coachId/:subscribtionId/:subscribtionDurationInMonth/:subscribtionPrice/:subscribtionName', 
    component: SubscribeComponent 
  },
  {
     path: 'update-user',
      component: UserProfileComponent 
    },
    {
      path: 'calcalory',
       component: CalCalculatecaloryComponent 
     },
     {
      path: 'confirmemail',
       component: EmailConfirmationComponent 
     },
     {
      path: 'confirmchangeemail',
       component:ConfirmChangeEmailComponent 
     },
     
  { 
      path: 'register', 
      component: RegisterComponent 
    },
    {
       path: 'checkout',
        component: CheckoutComponent
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
  {
    path: 'resetpassword', // Add a path for the home component
    component: ResetPasswordComponent
  },
  {
    path: 'confirmresetpassword', // Add a path for the home component
    component: ConfirmResetComponent
  },
  {
    path: 'ahtletesub', // Add a path for the home component
    component: AthleteSubscriptionComponent
  },
  // { path: 'payment', component: PaymentComponent },
  {
    path: 'coach/:coachId', // Dynamic route parameter for coachId
    component: CoachDetailsComponent, // This component will display detailed information about the coach
  },

  {
    path: 'addSubscription', // Dynamic route parameter for coachId
    component: CreateSubscribtionComponent, // This component will display detailed information about the coach
  },
  {
    path: 'getSubscription', // Dynamic route parameter for coachId
    component: CoachSubscriptionComponent, // This component will display detailed information about the coach
  },

  //Admin
  {
    path: 'siteinfo', // Dynamic route parameter for coachId
    component: SiteInfoComponent, // This component will display detailed information about the coach
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
