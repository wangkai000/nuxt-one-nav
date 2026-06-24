// useScroll.ts — 统一滚动容器操作
// 消除 default.vue / Sidebar.vue / FloatingActions.vue 中的重复逻辑

const getScrollTop = (): number => {
  if (import.meta.server) return 0
  const elMain = document.querySelector('.el-main') as HTMLElement | null
  return Math.max(elMain?.scrollTop || 0, window.scrollY || 0)
}

const scrollToElement = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const tryScroll = (retriesLeft: number) => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'instant', block: 'start' })
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          resolve(true)
        }, 300)
        return
      }
      if (retriesLeft > 0) {
        setTimeout(() => tryScroll(retriesLeft - 1), 100)
      } else {
        resolve(false)
      }
    }
    tryScroll(20)
  })
}

const scrollToTop = () => {
  const elMain = document.querySelector('.el-main') as HTMLElement | null
  if (elMain && elMain.scrollTop > 0) {
    elMain.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function useScroll() {
  return {
    getScrollTop,
    scrollToElement,
    scrollToTop,
  }
}
