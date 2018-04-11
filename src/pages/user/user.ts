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
}
from '../../providers/rest/rest';
import {HeadfacePage} from '../headface/headface';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

  headface: string = "http://img1.touxiang.cn/uploads/20121212/12-055808_368.jpg";
  errorMessage: any;
  nickname: string = "加载中...";

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
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        let loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(userinfo => {
              this.nickname = userinfo["UserNickName"];
              this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf(); //加后缀参数防止缓存

              loading.dismiss();
            },
            error => this.errorMessage = < any > error);
      }
    });
  }

  updateNickName() {
    this.storage.get("UserId").then((val) => {
      if (val != null) {
        let loading = super.showLoading(this.loadCtrl, "修改中...");
        this.rest.updateNickName(val, this.nickname)
          .subscribe(
            f => {
              if (f["Status"] == "OK") {
                loading.dismiss();
                super.showToast(this.toastCtrl, "昵称修改成功！");
                this.viewCtrl.dismiss();
              } else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
            },
            error => this.errorMessage = < any > error);
      }
    });
  }

  gotoHeadFace(){
    this.navCtrl.push(HeadfacePage);
  }

  logout(){
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }
}
