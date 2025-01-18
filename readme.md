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

