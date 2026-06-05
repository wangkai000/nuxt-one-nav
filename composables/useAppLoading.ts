/**
 * 全局加载状态 composable
 */
export const useAppLoading = () => {
  const loading = useState<boolean>('global-loading', () => false)

  const start = () => { loading.value = true }
  const stop = () => { loading.value = false }

  return { loading, start, stop }
}
