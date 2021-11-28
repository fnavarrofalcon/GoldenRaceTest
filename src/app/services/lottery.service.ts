import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ball, Bet } from '../model/app.model';

@Injectable({
    providedIn: 'root'
})
export class LotteryService {

    private selectedBalls$ = new Subject<Ball[]>();
    public getSelectedBalls$(): Observable<Ball[]> {
        return this.selectedBalls$.asObservable();
    }
    private _selectedBalls: Ball[] = [];
    get selectedBalls(): Ball[] {
        return this._selectedBalls;
    }
    set selectedBalls(value: Ball[]) {
        this._selectedBalls = value;
    }

    private bettingInfo$ = new Subject<Bet>();
    public getBettingInfo$(): Observable<Bet> {
        return this.bettingInfo$.asObservable();
    }
    private _bettingInfo: Bet;
    get bettingInfo(): Bet {
        return this._bettingInfo;
    }
    set bettingInfo(value: Bet) {
        this._bettingInfo = value;
    }

    constructor() { }

    public addBalltoSelection(ball: Ball) {
        this.selectedBalls.push(ball);
        this.selectedBalls$.next(this.selectedBalls);
    }

    public removeBalltoSelection(ball: Ball) {
        this.selectedBalls.splice(
            this.selectedBalls.findIndex(
                (value: Ball) => { return value.idNumber === ball.idNumber }
            ), 1
        );
        this.selectedBalls$.next(this.selectedBalls);
    }

    public clearSelection() {
        this.selectedBalls = []
        this.selectedBalls$.next(this.selectedBalls);
    }

    public clearGame() {
        this.clearSelection();
        this.bettingInfo = null;
        this.bettingInfo$.next(this.bettingInfo)
    }

    public setBettingInfo(betInfo: Bet) {
        this.bettingInfo = betInfo;
        this.bettingInfo$.next(this.bettingInfo);
    }
}
