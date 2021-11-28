import { Component, OnInit } from '@angular/core';
import { Ball, Bet } from 'src/app/model/app.model';
import { LotteryService } from 'src/app/services/lottery.service';

const maxBallNumber = 10;

@Component({
    selector: 'app-ball-selector',
    templateUrl: './ball-selector.component.html',
    styleUrls: ['./ball-selector.component.scss']
})

export class BallSelectorComponent implements OnInit {

    lotteryDrum: Ball[] = [];
    ballSelection: Ball[] = [];
    betInfo: Bet;

    constructor(private lotteryService: LotteryService) { }

    ngOnInit(): void {
        this.initializeDrum();
        this.lotteryService.getSelectedBalls$().subscribe(
            (data: Ball[]) => {
                if (data) this.ballSelection = data;
            }
        )
        this.lotteryService.getBettingInfo$().subscribe(
            (data: Bet) => {
                this.betInfo = data;
            }
        )
    }

    selectedBall(ball: Ball) {
        if (this.checkContainBall(ball)) {
            this.lotteryService.removeBalltoSelection(ball);
        } else {
            this.lotteryService.addBalltoSelection(ball);
        }
    }

    clearSelection() {
        this.lotteryService.clearSelection();
    }

    clearGame() {
        this.lotteryService.clearGame();
    }

    private initializeDrum() {
        while (maxBallNumber > this.lotteryDrum.length) {
            this.lotteryDrum.push(
                {
                    idNumber: this.lotteryDrum.length + 1,
                    probability: 100/maxBallNumber
                }
            )
        }
    }

    private checkContainBall(ball: Ball) {
        return this.ballSelection.find(
            (value: Ball) => {
                return value.idNumber === ball.idNumber;
            }
        )
    }


}
