
type EnjoyAppType = {
  app: {
    getPlatformInfo: () => Promise<PlatformInfoType>;
  },
}