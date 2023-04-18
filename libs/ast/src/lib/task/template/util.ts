import { PrizmAstTemplateAttributeType } from './model';
import { PrizmAstTaskTemplate } from './abstract';

export function prizmAstGetTypeOfAttribute(attribute: string): PrizmAstTemplateAttributeType {
  attribute = attribute.trim();
  if (attribute.startsWith('[')) return PrizmAstTemplateAttributeType.inputVar;
  else if (attribute.startsWith('([') || attribute.startsWith('[('))
    return PrizmAstTemplateAttributeType.inputOutput;
  else if (attribute.startsWith('(')) return PrizmAstTemplateAttributeType.output;

  return PrizmAstTemplateAttributeType.input;
}

// export function prizmAstGetOutputBytAttrForTemplate (
//   attrName: string,
//   attributes: Record<string, unknown>
// ) {
//   const name = prizmAstCheckAndGetAttrName(
//     attributes,
//     attrName
//   )
//   if (!name) return null;
//
//   const type = prizmAstGetTypeOfAttribute(
//     name
//   );
//
//   if (type === PrizmAstTemplateAttributeType.input) return name;
//   if (type === PrizmAstTemplateAttributeType.inputVar) return `{{${attrName}}`;
//   if (type === PrizmAstTemplateAttributeType.inputOutput) return `{{${attrName}}`;
//
//   return null;
// }

export function prizmAstRemoveByAttrName(
  attributes: Record<string, unknown>,
  attrName: string
): typeof attributes {
  attrName = prizmAstGetAttrName(attrName);
  const inputName = prizmAstConvertAttrNameToInputVar(attrName);
  const outputName = prizmAstConvertAttrNameToOutputVar(attrName);
  const inputOutputName = prizmAstConvertAttrNameToInputOutput(attrName);
  const outputInputName = prizmAstConvertAttrNameToOutputInput(attrName);

  delete attributes[attrName];
  delete attributes[inputName];
  delete attributes[outputName];
  delete attributes[inputOutputName];
  delete attributes[outputInputName];

  return attributes;
}

export function prizmAstGetOutputBytAttrForTemplate(
  attributes: Record<string, unknown>,
  attrName: string
): string | null {
  attrName = prizmAstGetAttrName(attrName);
  const type = prizmAstGetTypeOfAttribute(attrName);
  const value = attributes[attrName] as any;

  switch (type) {
    case PrizmAstTemplateAttributeType.input:
      return value;
    case PrizmAstTemplateAttributeType.inputVar:
    case PrizmAstTemplateAttributeType.inputOutput:
      return `{{${value}}}`;

    default:
      return null;
  }
}

export function prizmAstConvertAttrNameToInputVar(attrName: string) {
  return `[${attrName}]`;
}

export function prizmAstConvertAttrNameToOutputVar(attrName: string) {
  return `(${attrName})`;
}

export function prizmAstHasAttribute(
  attrName: string,
  attributes: Record<string, unknown>,
  check: PrizmAstTemplateAttributeType[] = [
    PrizmAstTemplateAttributeType.inputOutput,
    PrizmAstTemplateAttributeType.input,
    PrizmAstTemplateAttributeType.output,
    PrizmAstTemplateAttributeType.inputVar,
  ]
) {
  if (!attributes) return false;

  if (
    (check.includes(PrizmAstTemplateAttributeType.input) ||
      check.includes(PrizmAstTemplateAttributeType.inputOutput)) &&
    (attrName in attributes ||
      prizmAstConvertAttrNameToInputOutput(attrName) in attributes ||
      prizmAstConvertAttrNameToOutputInput(attrName) in attributes)
  )
    return true;

  if (
    (check.includes(PrizmAstTemplateAttributeType.inputVar) ||
      check.includes(PrizmAstTemplateAttributeType.inputOutput)) &&
    (prizmAstConvertAttrNameToInputVar(attrName) in attributes ||
      prizmAstConvertAttrNameToInputOutput(attrName) in attributes ||
      prizmAstConvertAttrNameToOutputInput(attrName) in attributes)
  )
    return true;

  if (
    (check.includes(PrizmAstTemplateAttributeType.output) ||
      check.includes(PrizmAstTemplateAttributeType.inputOutput)) &&
    (prizmAstConvertAttrNameToOutputVar(attrName) in attributes ||
      prizmAstConvertAttrNameToInputOutput(attrName) in attributes ||
      prizmAstConvertAttrNameToOutputInput(attrName) in attributes)
  )
    return true;

  return false;
}

export function prizmAstConvertAttrNameToInputOutput(attrName: string) {
  return `[(${attrName})]`;
}

export function prizmAstConvertAttrNameToOutputInput(attrName: string) {
  return `([${attrName}])`;
}

export function prizmAstGetAttrName(attrName: string): string {
  return attrName.replace(/[[(\]) ]/g, '');
}

export function prizmAstCreateActionBy<T extends PrizmAstTaskTemplate<any>>(
  objClass: new () => T,
  payload: T['payload']
): ReturnType<T['create']> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new objClass().create(payload);
}