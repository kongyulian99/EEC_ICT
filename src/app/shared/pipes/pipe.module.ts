import { FormatingNumber } from './formating-number.pipe';
import { NgModule } from "@angular/core";
import { HTMLSafePipe } from "./htmlSafe.pipe";
import { CustomCurrencyPipe } from './custom-currency.pipe';

@NgModule({
  declarations: [ HTMLSafePipe, FormatingNumber, CustomCurrencyPipe ],
  exports: [ HTMLSafePipe,FormatingNumber, CustomCurrencyPipe  ]
})
export class PipesModule {}