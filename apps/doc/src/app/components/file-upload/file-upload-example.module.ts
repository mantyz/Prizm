import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateRoutes, TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { RouterModule } from '@angular/router';
import { PrizmButtonModule, PrizmFileUploadModule, PrizmToastModule } from '@prizm-ui/components';
import { PrizmFileUploadExampleComponent } from './file-upload-example.component';
import { PrizmFileUploadBasicExampleComponent } from './examples/basic/basic.component';
import { HttpClientModule } from '@angular/common/http';
import { fakeFileUploadProvider } from './interceptor';
import { PrizmFileAutoUploadExampleComponent } from './examples/auto-upload/auto-upload.component';

@NgModule({
  imports: [
    CommonModule,
    TuiAddonDocModule,
    PrizmFileUploadModule,
    PrizmToastModule,
    RouterModule.forChild(generateRoutes(PrizmFileUploadExampleComponent)),
    HttpClientModule,
    PrizmButtonModule,
  ],
  declarations: [
    PrizmFileUploadExampleComponent,
    PrizmFileUploadBasicExampleComponent,
    PrizmFileAutoUploadExampleComponent,
  ],
  providers: [fakeFileUploadProvider],
})
export class PrizmFileUploadExampleModule {}

