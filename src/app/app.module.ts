import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { DiscoverPage } from '../pages/discover/discover';
import { ChatPage } from '../pages/chat/chat';
import { MorePage } from '../pages/more/more';
import { NoticePage } from '../pages/notice/notice';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { HeadfacePage } from '../pages/headface/headface';
import { QuestionPage } from '../pages/question/question';
import { DetailsPage } from '../pages/details/details';
import { AnswerPage } from '../pages/answer/answer';
import { UserdatalistPage } from '../pages/userdatalist/userdatalist';
import { ScanPage } from '../pages/scan/scan';

import { ComponentsModule } from '../components/components.module'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

//导入四个外部加载的插件
import {
  Camera
} from '@ionic-native/camera';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer';
import {
  File
} from '@ionic-native/file';
import {
  FilePath
} from '@ionic-native/file-path';
import { QRScanner } from '@ionic-native/qr-scanner';
import { SettingsProvider } from '../providers/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoverPage,
    ChatPage,
    MorePage,
    NoticePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    UserdatalistPage,
    ScanPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule, //全局需要导入HTTP
    IonicStorageModule.forRoot(), //全局定义storage的模块
    ComponentsModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:"返回",
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoverPage,
    ChatPage,
    MorePage,
    NoticePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    UserdatalistPage,
    ScanPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider, //rest的定义导入
    File,
    FileTransfer,
    FilePath,
    Camera,
    QRScanner,
    SettingsProvider
  ]
})
export class AppModule {}
