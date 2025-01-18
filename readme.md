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

4. 