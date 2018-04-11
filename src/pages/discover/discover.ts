import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';


@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage extends BaseUI{

  questions: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions(){
    let loading = super.showLoading(this.loadingCtrl, "数据加载中...");
    this.rest.getQuestions().subscribe(
      q => {
        this.questions = q;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error
    );
  }

  doRefresh(refresher){
    this.getQuestions();
    refresher.complete();
  }

  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

}
