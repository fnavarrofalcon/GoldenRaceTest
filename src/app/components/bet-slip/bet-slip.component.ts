import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ball, Bet } from 'src/app/model/app.model';
import { LotteryService } from 'src/app/services/lottery.service';
import { ValidateNumber } from 'src/app/validators/only-numbers';

@Component({
    selector: 'app-bet-slip',
    templateUrl: './bet-slip.component.html',
    styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {

    ballSelection: Ball[] = [];
    betsForm: FormGroup;
    totalAmount: number = 0;
    betInfo: Bet;

    constructor(
        private lotteryService: LotteryService,
    ) { }

    ngOnInit(): void {
        this.initializeForm();
        this.lotteryService.getSelectedBalls$().subscribe(
            (data: Ball[]) => {
                if (data) this.ballSelection = data;
            }
        )
        this.lotteryService.getBettingInfo$().subscribe(
            (data: Bet) => {
                if (!data) {
                    this.initializeForm();
                    this.totalAmount = 0;
                    this.betInfo = data;
                }
            }
        )
    }

    submitBet() {
        if (this.betsForm.valid) {
            this.totalAmount = this.ballSelection.length * this.betsForm.value.bet;
        }
    }

    removeBall(ball: Ball) {
        this.lotteryService.removeBalltoSelection(ball);
    }

    startBet() {
        let numberWin = this.randomNumber();
        if (this.checkNumberWin(numberWin)) {
            this.betInfo = {
                profit: this.calculateProfit(),
                isWinner: true,
                numberWin: numberWin
            }
        } else {
            this.betInfo = {
                profit: 0,
                isWinner: false,
                numberWin: numberWin
            }
        }
        this.lotteryService.setBettingInfo(this.betInfo);
    }

    startBetDisable() {
        return !(this.totalAmount >= 5 && !this.betInfo)
    }

    private initializeForm() {
        this.betsForm = new FormGroup({
            bet: new FormControl('', [Validators.required, ValidateNumber(), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
        });
    }

    private randomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    private checkNumberWin(numberWin: number) {
        return this.ballSelection.find(
            (value: Ball) => {
                return value.idNumber === numberWin;
            }
        )
    }

    private calculateProfit() {
        return this.totalAmount * 1.5
    }

}
