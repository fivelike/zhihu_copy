import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { DiscoverPage } from '../discover/discover';
import { ChatPage } from '../chat/chat';
import { MorePage } from '../more/more';
import { NoticePage } from '../notice/notice';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscover = DiscoverPage;
  tabChat = ChatPage;
  tabNotice = NoticePage;
  tabMore = MorePage;

  constructor() {

  }
}
