import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  LoadingController
} from 'ionic-angular';
import {
  RestProvider
} from '../../providers/rest/rest';
import {
  SettingsProvider
} from '../../providers/settings/settings';
import {
  UserPage
} from '../user/user';
import {
  LoginPage
} from "../login/login";
import {
  Storage
} from '@ionic/storage';
import {
  BaseUI
} from '../../common/baseui';
import {
  UserdatalistPage
} from '../userdatalist/userdatalist';
import { ScanPage } from '../scan/scan';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  headface: string;
  userinfo: string[];
  selectedTheme: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage,
    public settings: SettingsProvider) {
    super();
    this.settings.getActiveTheme().subscribe(val => {
      this.selectedTheme = val;
    });
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    //关闭后的回调
    modal.onDidDismiss(() => {
      this.loadUserPage();
    });
    modal.present();
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
            this.userinfo = userinfo;
            this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf(); //加后缀参数防止缓存
            this.notLogin = false;
            this.logined = true;
            loading.dismiss();
          });
      } else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }


  gotoUserPage() {
    this.navCtrl.push(UserPage);

  }

  /**
   * 跳转到扫描二维码的页面，加上 animate=false的参数是为了
   * 相机能够在整个屏幕中显示，如果不加，相机无法显示
   * animate参数默认值未true
   * 
   * @memberof MorePage
   */
  gotoScanQRCode(){
    this.navCtrl.push(ScanPage, null, {"animate":false});
  }

  gotoDataList(type) {
    this.navCtrl.push(UserdatalistPage, {
      "dataType": type
    });
  }

  toggleChangeTheme() {
    if (this.selectedTheme === "dark-theme") {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }
}
