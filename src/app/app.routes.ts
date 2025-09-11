import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard/dashboard.component').then(c => c.DashboardComponent),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending/trending.component').then(c => c.TrendingComponent),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search/search.component').then(c => c.SearchComponent),
      },
      {
        path: 'history/:key',
        loadComponent: () => import('./gifs/pages/history/history.component').then(c => c.HistoryComponent),
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
