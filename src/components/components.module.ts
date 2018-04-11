import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionListComponent } from './question-list/question-list';
@NgModule({
	declarations: [QuestionListComponent],
	imports: [IonicPageModule.forChild(QuestionListComponent)],
	exports: [QuestionListComponent]
})
export class ComponentsModule {}
