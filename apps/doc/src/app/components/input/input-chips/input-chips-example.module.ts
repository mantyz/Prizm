import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { generateRoutes, TuiAddonDocModule } from '@taiga-ui/addon-doc';

import { InputChipsExampleBaseComponent } from './examples/input-chips-basic-example/input-chips-basic-example.component';
import { InputChipsExampleComponent } from './input-chips-example.component';
import { PrizmChipsModule, PrizmInputTextModule } from '@prizm-ui/components';
import { InputChipsOuterExampleComponent } from './examples/input-chips-outer-example/input-chips-outer-example.component';

@NgModule({
  imports: [
    TuiAddonDocModule,
    RouterModule.forChild(generateRoutes(InputChipsExampleComponent)),
    PrizmInputTextModule,
    PrizmChipsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [InputChipsExampleBaseComponent, InputChipsExampleComponent, InputChipsOuterExampleComponent],
  exports: [InputChipsExampleComponent],
})
export class InputChipsExampleModule {}

