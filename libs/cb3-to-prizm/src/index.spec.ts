// import { Tree } from '@nrwl/devkit';
// import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
// import { Cb3ToPrizmSchematicSchema } from './index';
// // eslint-disable-next-line no-duplicate-imports
// import mySchematic from './index';
//
// describe('my-schematic', () => {
//   let tree: Tree;
//
//   beforeEach(() => {
//     tree = createTreeWithEmptyWorkspace();
//   });
//
//   it('should update the entry file of the specified project', async () => {
//     // Добавьте проект в рабочее пространство для тестирования
//     tree.write(
//       'workspace.json',
//       JSON.stringify({
//         version: 1,
//         projects: {
//           'my-test-project': {
//             root: 'apps/my-test-project',
//             sourceRoot: 'apps/my-test-project/src',
//             projectType: 'application',
//             targets: {
//               build: {
//                 options: {
//                   main: 'apps/my-test-project/src/main.ts',
//                 },
//               },
//             },
//           },
//         },
//       })
//     );
//
//     // Создайте исходный файл проекта
//     tree.write('apps/my-test-project/src/main.ts', `console.log('Hello, World!');`);
//
//     const schema: Cb3ToPrizmSchematicSchema = { projectName: 'my-test-project' };
//     await mySchematic(tree, schema);
//
//     // Проверьте, что файл был обновлен
//     const entryFileContent = tree.read('apps/my-test-project/src/main.ts', 'utf-8');
//
//     expect(entryFileContent).toContain('// Добавлено схематикой');
//   });
// });