export const appQueryKeys = {
  all: ["app"] as const,
  appShell: () => [...appQueryKeys.all, "shell"] as const,
};
