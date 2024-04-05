import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { PrizmAbstractTestId } from '../../abstract/interactive';
import { PrizmIconsFullRegistry } from '@prizm-ui/icons/core';
import { prizmIconsArrowLeft } from '@prizm-ui/icons/full/source';

@Component({
  selector: 'prizm-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent extends PrizmAbstractTestId {
  @Input() withBackButton = false;
  @Input() header: string | null = null;
  @Input() subheader: string | null = null;

  @Output() backClick: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('headerElement', { static: true }) public headerRef!: ElementRef;

  override readonly testId_ = 'ui_panel';

  private readonly iconsFullRegistry = inject(PrizmIconsFullRegistry);

  constructor() {
    super();
    this.iconsFullRegistry.registerIcons(prizmIconsArrowLeft);
  }

  public back(): void {
    this.backClick.emit();
  }
}
