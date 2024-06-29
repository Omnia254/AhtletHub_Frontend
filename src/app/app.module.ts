import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './public/components/home/home.component';
import { CarouselHomeComponent } from './public/carousel-home/carousel-home.component';
import { IconSectionComponent } from './public/components/icon-section/icon-section.component';
import { PriceCardComponent } from './public/components/price-card/price-card.component';
import { CoachFilterComponent } from './public/components/coach-filter/coach-filter.component';
import { CoachListComponent } from './public/components/coach-list/coach-list.component';
import { MockCoachService } from './public/services/mock-coach-service.service';
import { CoachService } from './public/services/coach.service';
import { NavBarComponent } from './public/components/nav-bar/nav-bar.component';
import { LoginComponent } from './public/components/ApiComponent/login/login.component';
import { AboutUsComponent } from './public/components/about-us/about-us.component';
import { CoachDetailsComponent } from './public/components/coach-details/coach-details.component';
import { UserProfileComponent } from './public/components/ApiComponent/user-profile/user-profile.component';
import { FavoriteCoachesComponent } from './public/components/favorite-coaches/favorite-coaches.component';
import { SubscriptionComponent } from './public/components/subscription/subscription.component';
import { PaymentComponent } from './public/components/payment/payment.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CoachesComponent } from './public/components/ApiComponent/coaches/coaches.component';
import { CoachesDetailComponent } from './public/components/ApiComponent/coaches-detail/coaches-detail.component';
import { SubscribeComponent } from './public/components/ApiComponent/subscribe/subscribe.component';
import { RegisterComponent } from './public/components/ApiComponent/register/register.component';
import { CheckoutComponent } from './public/components/ApiComponent/checkout/checkout.component';
import { CalCalculatecaloryComponent } from './public/components/ApiComponent/cal-calculatecalory/cal-calculatecalory.component';
import { CustomEncoder } from './public/custom-encoder';
import { EmailConfirmationComponent } from './public/components/ApiComponent/email-confirmation/email-confirmation.component';
import { SendEmailComponent } from './public/components/ApiComponent/send-email/send-email.component';
import { LogoutComponent } from './public/components/ApiComponent/logout/logout.component';
import { LoginUserComponent } from './public/components/ApiComponent/login-user/login-user.component';
import { MeasurementComponent } from './public/components/ApiComponent/measurement/measurement.component';
import { MeasurementPostComponent } from './public/components/ApiComponent/measurement-post/measurement-post.component';
import { JwtInterceptor } from './_interceptord/jwt.interceptor';
import { DeleteMeasurementComponent } from './public/components/ApiComponent/delete-measurement/delete-measurement.component';
import { ActivateDeactivateUserComponent } from './public/components/ApiComponent/activate-deactivate-user/activate-deactivate-user.component';
import { AccountSettingComponent } from './public/components/ApiComponent/account-setting/account-setting.component';
import { ChangePasswordComponent } from './public/components/ApiComponent/change-password/change-password.component';
import { ChangeEmailComponent } from './public/components/ApiComponent/change-email/change-email.component';
import { ConfirmChangeEmailComponent } from './public/components/ApiComponent/confirm-change-email/confirm-change-email.component';
import { CoachHomeComponent } from './public/components/ApiComponent/coach-home/coach-home.component';
import { CoachnavbarComponent } from './public/components/ApiComponent/coachnavbar/coachnavbar.component';
import { CreateSubscribtionComponent } from './public/components/ApiComponent/create-subscribtion/create-subscribtion.component';
import { CoachSubscriptionComponent } from './public/components/ApiComponent/coach-subscription/coach-subscription.component';
//import { AddToFavoriteComponent } from './public/components/ApiComponent/add-to-favorite/add-to-favorite.component';

// specify the key where the token is stored in the local storage
export const LOCALSTORAGE_TOKEN_KEY = 'angular_material_login_and_register_example';

// specify tokenGetter for the angular jwt package
export function tokenGetter() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselHomeComponent,
    IconSectionComponent,
    PriceCardComponent,
    CoachFilterComponent,
    CoachListComponent,
    NavBarComponent,
    AboutUsComponent,
    CoachDetailsComponent,
    UserProfileComponent,
    FavoriteCoachesComponent,
    SubscriptionComponent,
    PaymentComponent,
    CoachesComponent,
    CoachesDetailComponent,
    SubscribeComponent,
    RegisterComponent,
    CheckoutComponent,
    CalCalculatecaloryComponent,
    EmailConfirmationComponent,
    SendEmailComponent,
    LogoutComponent,
    LoginUserComponent,
    MeasurementComponent,
    MeasurementPostComponent,
    DeleteMeasurementComponent,
    ActivateDeactivateUserComponent,
    AccountSettingComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    ConfirmChangeEmailComponent,
    CoachHomeComponent,
    CoachnavbarComponent,
    CreateSubscribtionComponent,
    CoachSubscriptionComponent,
    //AddToFavoriteComponent,
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Import our Routes for this module
    AppRoutingModule,
    FormsModule,
   
    // Angular Material Imports
    MatSnackBarModule,
    MatRadioModule,
    MatCardModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
   ReactiveFormsModule,
   FormsModule,
    // Jwt Helper Module Import
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000', 'localhost:8080']
      }
    })
  ],
  //providers: [],
  providers: [
    // Use MockCoachService here for testing purposes, replace with CoachService for production
    { 
      provide: HTTP_INTERCEPTORS, 
      //useClass: CustomEncoder ,
      useClass: JwtInterceptor, 
      multi:true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
