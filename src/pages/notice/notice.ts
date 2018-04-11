import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ModalController,
  ToastController,
  ViewController
} from 'ionic-angular';
import {
  BaseUI
} from '../../common/baseui';
import {
  Storage
} from '@ionic/storage';
import {
  RestProvider
}from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';


@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage extends BaseUI{
  errorMessage: any;
  notificationList:string[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    super();
  }

  ionViewDidEnter() {
    this.loadNotification();
  }

  loadNotification(){
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserNotifications(val)
          .subscribe(n => {
            // console.log(n);
            this.notificationList = n;
            loading.dismissAll();
          },
            error => this.errorMessage = <any>error);
      }
    });
  }

  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }
}
