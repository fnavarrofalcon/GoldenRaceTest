import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotteryGameComponent } from './views/lotery-game/lottery-game.component';

const routes: Routes = [
    { path: 'lottery', component: LotteryGameComponent },
    { path: '', redirectTo: '/lottery', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
