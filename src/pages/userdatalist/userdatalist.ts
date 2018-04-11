import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-userdatalist',
  templateUrl: 'userdatalist.html',
})
export class UserdatalistPage {

  dataType:string;
  title:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataType = navParams.get('dataType');
    switch(this.dataType){
      case "question":this.title="我的提问";break;
      case "answer": this.title = "我的回答"; break;
      case "favourite": this.title = "我的关注"; break;
    }
  }

}
