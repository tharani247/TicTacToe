import { Component, OnInit } from '@angular/core';
import {Player} from '../player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  DIMENSIONS:Array<number> = [];
  players:Array<Player> = [];
  player1:Player = {'BoxesOwned':[],'Turn':false,Type:'O','Winner':false};
  player2:Player = {'BoxesOwned':[],'Turn':false,Type:'X','Winner':false};
  winningSequence = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
  constructor() { }
  ngOnInit() {
    this.players.push(this.player1);
    this.players.push(this.player2);
    this.DIMENSIONS = Array(9).fill(0).map((e,i)=>i+1)
    //this.player1.Turn = true;
    this.players.find(player => player.Type === 'O').Turn = true;
  }

  setBorderTop(dimension:number){
    return dimension === 1 || dimension === 2 || dimension === 3?'none':''
  }

  markLocation(dimension:number){
    if(!this.checkIfClicked(dimension)){
      let foundPlayer = this.players.find(player=>player.Turn === true);
      foundPlayer.BoxesOwned.push(dimension);
      foundPlayer.Type === 'O'?this.players.find(player=>player.Type==='X').Turn = true:this.players.find(player=>player.Type==='O').Turn = true;
      foundPlayer.Turn = false;
      this.findTurn(foundPlayer,dimension);
      this.isWinner(foundPlayer);
    }
  }

  findTurn(player:Player,dimension:number){
    return player.BoxesOwned.some(item => item === dimension);
  }
  checkIfClicked(dimension:number){
    let mainArray = [];
    this.players[0].BoxesOwned.forEach(element => {
      mainArray.push(element);      
    }); 
    this.players[1].BoxesOwned.forEach(element => {
      mainArray.push(element);      
    }); 
    let hasBeenClicked = mainArray.some(item => item === dimension);
    return hasBeenClicked;
  }

  getOwnership(dimension:number,type:string) {
    if(type === 'X'){
      let found = this.player1.BoxesOwned.find(item => item === dimension);
      if(found){
        return true;
      }
      return false;
    } else {
      let found = this.player2.BoxesOwned.find(item => item === dimension);
      if(found){
        return true;
      }
      return false;
    }
  }

  isWinner(player:Player){
    // Check with the winning sequence and announce the winner
    player.BoxesOwned.sort();
  }


}
