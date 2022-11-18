import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateRoutes, TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader.component';
import { PrizmLoaderBaseExampleComponent } from './examples/base/loader-base-example.component';
import { PrizmLoaderModule } from '@prizm-ui/components';

@NgModule({
  imports: [
    CommonModule,
    TuiAddonDocModule,
    PrizmLoaderModule,
    RouterModule.forChild(generateRoutes(LoaderComponent)),
  ],
  declarations: [
    PrizmLoaderBaseExampleComponent,
    LoaderComponent
  ],
  exports: [LoaderComponent],
})
export class LoaderModule {}
