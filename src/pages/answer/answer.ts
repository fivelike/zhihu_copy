import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import {
  Storage
} from '@ionic/storage';
import {
  BaseUI
} from '../../common/baseui';
import {
  RestProvider
} from '../../providers/rest/rest';

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI{

  id:string;
  content: string;
  errorMessage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
      super();
      this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AnswerPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  submit(){
    this.storage.get("UserId").then((val) => {
      if (val !== null) {
        var loading = super.showLoading(this.loadingCtrl, "发表中...");
        this.rest.answer(val, this.id, this.content).subscribe(f => {
          if (f["Status"] == "OK") {
            loading.dismiss();
            this.dismiss();
          } else {
            loading.dismiss();
            super.showToast(this.toastCtrl, f["StatusContent"]);
          }
        },
          error => this.errorMessage = <any>error);
      } else {
        super.showToast(this.toastCtrl, "请登陆后发布回答...");
      }
    });
  }

}
