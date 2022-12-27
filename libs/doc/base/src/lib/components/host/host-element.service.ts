import { ComponentFactoryResolver, ElementRef, EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { PrizmDocumentationPropertyType } from '../../types/pages';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { PrizmPageService } from '../page/page.service';
import { PrizmDocHostElementListenerService } from './host-element-listener.service';


export type PrizmDocHosSet = {
  type: string;
  key: string;
};

@Injectable()
export class PrizmDocHostElementService implements OnDestroy {
  private readonly hostElementMap = new Map<string, ElementRef>();
  private readonly hostElementMap$$ = new BehaviorSubject(this.hostElementMap);
  private readonly subscription = new Subscription();

  public outputs: Map<string, {propName: string, templateName: string}[]> = new Map();
  public inputs:  Map<string, {propName: string, templateName: string}[]> = new Map();
  public readonly componentInfo: Map<string, {
    selector: string;
    type: unknown;
    name: string;
  }> = new Map();

  public readonly emitInfoAboutCheckResult$$ = new Subject<void>();

  private readonly destroyListener$ = new Subject<void>();
  // public readonly inputOutputMap = new Map<string, PrizmDocHosSet>();
  public readonly outputMap = new Map<string, Map<string, PrizmDocHosSet>>();
  public readonly inputMap = new Map<string, Map<string, PrizmDocHosSet>>();
  public safeReInit(): void {
    this.destroyListener$.next();
    this.hostElementMap$$.pipe(
        takeUntil(this.destroyListener$),
        tap((map) => {
          const entries = [...map.entries()];
          entries.forEach(
            ([hostKey, el]) => {
              this.updateComponentInfo(hostKey, el);
              this.emitInfoAboutCheckResult$$.next();
            }
          );
        })
    ).subscribe()
  }

  private updateComponentInfo(
    key: string,
    el: ElementRef
  ): void {
    const currentOutputMap = this.outputMap.get(key) || new Map();
    const metaComponentData = this.componentFactoryResolver.resolveComponentFactory(el.nativeElement.constructor);
    this.outputs.set(key, metaComponentData.outputs);
    this.inputs.set(key, metaComponentData.inputs);
    this.componentInfo.set(key, {
      selector: metaComponentData.selector,
      type: metaComponentData.componentType,
      name: metaComponentData.componentType.name,
    });

    const notSpecifiedKeys = metaComponentData.outputs.map(
      i => i.propName
    ).filter(
      (key) => !currentOutputMap.has(key)
    );
    currentOutputMap.forEach(
      ({key, type}) => {
        this.addOutputListener(el, type, key);
      }
    )
    notSpecifiedKeys.forEach(
      (key) => {
        this.addOutputListener(el, 'unknown', key, true);
      }
    )
  }

  private initChecker(): void {
    this.subscription.add(
      this.emitInfoAboutCheckResult$$.pipe(
        debounceTime(500),
        tap(
          () => {
            this.emitInfoAboutCheckResult();
          }
        )
      ).subscribe()
    )
  }

  private addOutputListener(
    el: ElementRef<any>,
    type: string,
    eventRealKey: string,
    hasNotListener = false
  ): void {
    if (!el.nativeElement?.[eventRealKey]) {
      console.error('Prizm component already exists', {
      });
      return;
    }

    el.nativeElement?.[eventRealKey]?.pipe(
      takeUntil(this.destroyListener$),
      tap(
        (data) => {
          this.emit(data, type, eventRealKey, hasNotListener);
        }
      )
    )
      .subscribe();
  }

  private emitInfoAboutCheckResult(): void {
    [...this.componentInfo.keys()].forEach(
      (key) => {
        this.emitInfoSingle(key)
      }
    )
  }

  private emit(
    data: unknown,
    type: string,
    event: string,
    hasNotListener: boolean
  ): void {
    this.prizmDocHostElementListenerService.emit(
      hasNotListener,
      data,
      event,
      type,
      this.prizmPageService.info
    );
  }

  private emitInfoSingle(key: string): void {
    const allOutputs = this.outputs.get(key).map(i => i.propName);
    const allInputs = this.inputs.get(key).map(i => i.propName);
    this.prizmDocHostElementListenerService.emitInfo({
      selector: this.componentInfo.get(key).selector,
      allOutputs,
      allInputs,
      notListenerInputs: allInputs.filter(i => !this.inputMap.get(key)?.has(i)),
      notListenerOutputs: allOutputs.filter(i => !this.outputMap.get(key)?.has(i)),
    });
  }

  public setHostElement(
    key:string,
    hostElement: ElementRef): void {
    this.hostElementMap.set(key, new ElementRef<any>(hostElement))
    this.hostElementMap$$.next(this.hostElementMap);
  }

  constructor(
    private readonly prizmPageService: PrizmPageService,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly prizmDocHostElementListenerService: PrizmDocHostElementListenerService,
  ) {
    this.initChecker();
  }

  public destroy(): void {
    this.hostElementMap$$.complete();
    this.hostElementMap$$.unsubscribe();
    this.subscription.unsubscribe();
    this.destroyListener$.next();
    this.destroyListener$.complete();
  }

  public ngOnDestroy(): void {
    this.destroy();
  }

  public addListener(
    key: string,
    propertyMode: PrizmDocumentationPropertyType,
    propertyType: string,
    event: string,
  ): void {
    const currentOutputMap = this.outputMap.get(key) ?? new Map();
    const currentInputMap = this.inputMap.get(key) ?? new Map();

    switch (propertyMode) {
      case 'input-output': {
        const emitEventKey = `${event}Change`;
        currentOutputMap.set(
          emitEventKey,
          {
            key: emitEventKey,
            type: propertyType,
          }
        );
        currentInputMap.set(
          event,
          {
            key: event,
            type: propertyType,
          }
        );
      }
      break;
      case 'output':
        currentOutputMap.set(
          event,
          {
          key: event,
          type: propertyType,
        });
      break;
      case 'input':
        currentInputMap.set(
          event,
          {
          key: event,
          type: propertyType,
        });
      break;
    }

    this.outputMap.set(key, currentOutputMap);
    this.inputMap.set(key, currentInputMap);
    this.safeReInit();
  }
}