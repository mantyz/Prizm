import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RawLoaderContent, TuiDocExample } from '@prizm/doc-base';
import { PrizmInputSize } from '@prizm-ui/components';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'prizm-input-date-range-example',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateRangeComponent {
  public label = 'Период';
  public dateControl = new FormControl();
  public placeholder = 'Выберите период';
  public sizeVariants: ReadonlyArray<PrizmInputSize> = ['l', 'm', 's'];
  public size: PrizmInputSize = 'm';
  public outer = false;

  readonly setupModule: RawLoaderContent = import('!!raw-loader!./examples/setup-module.md');

  readonly exampleBase: TuiDocExample = {
    TypeScript: import('!!raw-loader!./examples/base/input-date-range-base-example.component.ts'),
    HTML: import('!!raw-loader!./examples/base/input-date-range-base-example.component.html'),
  };

  readonly exampleDisabled: TuiDocExample = {
    TypeScript: import('!!raw-loader!./examples/disabled/input-date-range-disabled-example.component.ts'),
    HTML: import('!!raw-loader!./examples/disabled/input-date-range-disabled-example.component.html'),
  };

  readonly exampleNativeDate: TuiDocExample = {
    TypeScript: import(
      '!!raw-loader!./examples/native-date/input-native-date-range-base-example.component.ts'
    ),
    HTML: import('!!raw-loader!./examples/native-date/input-native-date-range-base-example.component.html'),
  };
}
