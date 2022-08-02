import { PolymorphContent } from '@digital-plant/zui-components';

export function generatePolymorphVariants (
  ...content: PolymorphContent[]
): PolymorphContent[] {
  return [
    new Array(200).fill('ОченьДлинныйТекст').join(''),
    null,
    'Короткий текст',
    new Array(5).fill('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.').join('\n'),
    ...content
  ]
}
