import {
  Component
}
from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController,
} from 'ionic-angular';
import {
  BaseUI
}
from '../../common/baseui';
import {
  RestProvider
}
from '../../providers/rest/rest';
import { RegisterPage } from '../register/register';
import {
  Storage
}
from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  mobile: any;
  password: any;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage) {
    super(); //调用父类的构造函数
  }

  login() {
    let loading = super.showLoading(this.loadingCtrl, "登陆中...");
    this.rest.login(this.mobile, this.password)
      .subscribe(
        f => {
          if (f["Status"] == "OK") {
            //处理登陆成功的页面跳转
            //也可以存储接口返回的token
            this.storage.set('UserId', f["UserId"]);
            loading.dismiss();
            this.dismiss();
          } else {
            loading.dismiss();
            super.showToast(this.toastCtrl, f["StatusContent"]);
          }
        },
        error => this.errorMessage = < any > error);
  }

  /**
   * 关闭当前页面的方法
   * 
   * @memberof LoginPage
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * push注册页面
   * 
   * @memberof LoginPage
   */
  pushRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
}
