
type EnjoyAppType = {
  app: {
    getPlatformInfo: () => Promise<PlatformInfoType>;
  },
  db: {
    connect: () => Promise<DbState>,
  }
}