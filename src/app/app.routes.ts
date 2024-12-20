import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Constants } from './core/common/constants';
import { WrapperComponent } from './shared/components/wrapper/wrapper.component';

export const routes: Routes = [
  { path: '', redirectTo: `/auth/${Constants.LOGIN_PATH}`, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes') },
  {
    path: 'home',
    component: WrapperComponent,
    children: [
      {
        path: Constants.USERS_PATH,
        loadChildren: () => import('./features/users/users.routes'),
        data: { animation: 'UsersPage' },
      },
      {
        path: Constants.ATTRACTIONS_PATH,
        loadChildren: () => import('./features/attractions/attractions.routes'),
        data: { animation: 'AttractionsPage' },
      },
      {
        path: Constants.PETS_PATH,
        loadChildren: () => import('./features/pets/pets.routes'),
        data: { animation: 'PetsPage' },
      },
      {
        path: '**',
        redirectTo: `/home/${Constants.USERS_PATH}`,
      },
    ],
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
];
