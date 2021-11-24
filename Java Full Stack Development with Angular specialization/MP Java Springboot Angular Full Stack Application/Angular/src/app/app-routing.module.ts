import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import { RegisterNewUserComponent } from './component/register-new-user/register-new-user.component';
import { FormComponent } from './component/form/form.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AllPatientsListComponent } from './component/all-patients-list/all-patients-list.component';
import { ViewPatientComponent } from './component/view-patient/view-patient.component';
import { AllRequestedAppointmentsComponent } from './component/all-requested-appointments/all-requested-appointments.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes:Routes = [
	{path:'', redirectTo:'login', pathMatch:'full'},
	{path:'login', component:LoginComponent},
	{path: 'register_user',component:RegisterNewUserComponent},
	{path:'form', component:FormComponent, canActivate: [AuthGuard]},
	{path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
	{path:'patientList', component:AllPatientsListComponent, canActivate: [AuthGuard]},
	{path: 'patientList/:id', component: ViewPatientComponent, canActivate: [AuthGuard] },
	{path:'requested_appointments', component:AllRequestedAppointmentsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
  
})
export class AppRoutingModule {}


