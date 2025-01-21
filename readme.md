1. 初始化

```shell
npx create-electron-app@latest enjoy-rev --template=vite-typescript
```

2. package.json 增加 "type": "module"

参考!["type": "module" in package.json for Vite templates](https://github.com/electron/forge/issues/3502)


* tsconfig.json 增加"module": "ESNext",

* vite.main.config.ts 添加`es` formats

```tsx
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      fileName: () => '[name].js',
      formats: ["es"]
    }
  }
});
```

* 删除__dirname的引用

3. 添加 React, React Router, 别名配置

在`tsconfig.json`中添加别名之后，vscode仍然飘红，需要添加`eslint-import-resolver-typescript`

```shell
yarn add -D eslint-import-resolver-typescript
```

并在`.eslintrc.json`中添加

```json
{
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  },
}
```

配置`tsconfig.json`中的别名好像只是告诉编译器，但是真正运行的时候，还是需要配置`vite.renderer.config.ts`中的`resolve.alias`

```tsx
export default defineConfig({
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@renderer": path.resolve(__dirname, "./src/renderer"),
      "@commands": path.resolve(__dirname, "./src/commands"),
    }
  },
});
```

理论上配置完成就ok。但是不知道为啥，我本地跑的时候报错，删除electron包之后，重新安装运行就ok了。

4. 添加ShadcnUI

```shell
yarn add -D tailwindcss postcss autoprefixer


npx tailwindcss init -p
```

```shell
npx shadcn@latest init
```


5. 添加DB支持

可能会出现下面的错误

```
Error: Could not dynamically require "sqlite3". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.
```

rollup打包时会报错无法支持动态引入的方式

可能会有很多种方式解决这个问题，我采用最方便的方式，将有问题的模块排除在外，让打包后的代码在运行时直接从node_modules中加载模块，一劳永逸。

简单而言，就是在vite或者rollup中配置external参数。