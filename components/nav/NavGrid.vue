<template>
  <div class="space-y-8">
    <!-- 鎼滅储鏃舵樉绀烘墍鏈夌粨鏋滐紙涓嶅垎缁勶級 -->
    <template v-if="query.trim()">
      <div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>鎼滅储缁撴灉</span>
          <span class="text-sm font-normal text-gray-500">({{ filteredItems.length }})</span>
        </h2>
        <div v-if="filteredItems.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <NavCard v-for="item in filteredItems" :key="item.id" :item="item" v-memo="[item.id, query]" />
        </div>
        <div v-else class="flex flex-col items-center justify-center py-16 text-gray-500">
          <Icon name="mdi:magnify" class="w-12 h-12 mb-3 opacity-50" />
          <p>娌℃湁鎵惧埌鐩稿叧缃戠珯</p>
        </div>
      </div>
    </template>

    <!-- 姝ｅ父娴忚鏃舵寜鍒嗙被鍒嗙粍锛堝缁堟樉绀哄叏閮級 -->
    <template v-else>
      <div v-for="cat in categoriesWithItems" :key="cat.id" :id="`category-${cat.id}`" class="scroll-mt-20">
        <!-- 鍒嗙被鏍囬 -->
        <div class="flex items-center gap-3 mb-4">
          <Icon :name="getIconName(cat.icon)" class="w-5 h-5 text-gray-400" />
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ cat.name }}</h2>
          <span class="text-sm text-gray-500">({{ cat.items.length }})</span>
          <div class="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
        </div>

        <!-- 濡傛灉鏈夊瓙鍒嗙被锛屽垎缁勬樉绀?-->
        <div v-if="cat.children && cat.children.length > 0" class="space-y-6">
          <div v-for="child in cat.children.filter(c => c.items && c.items.length > 0)" :key="child.id" :id="`category-${child.id}`" class="scroll-mt-20">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 ml-2 flex items-center gap-2">
              <Icon :name="getIconName(child.icon)" class="w-4 h-4" />
              {{ child.name }}
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              <NavCard v-for="item in child.items" :key="item.id" :item="item" v-memo="[item.id, query]" />
            </div>
          </div>
        </div>

        <!-- 娌℃湁瀛愬垎绫荤殑鐩存帴鏄剧ず -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <NavCard v-for="item in cat.items" :key="item.id" :item="item" v-memo="[item.id, query]" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { navData, categories, getLeafCategories, getCategoryById } from '~/data/nav-data'
import type { NavItem, Category } from '~/types/nav'

const { query, activeCategory } = useSearch()

// mdi:xxx 杞崲涓?@iconify/vue 鏍煎紡
const getIconName = (icon: string): string => {
  if (icon.startsWith('mdi:')) {
    return `mdi:${icon.slice(4)}`
  }
  if (icon.startsWith('simple-icons:')) {
    return `simple-icons:${icon.slice(13)}`
  }
  return icon
}

// 鍙跺瓙鑺傜偣鍒嗙被锛堟墎骞冲寲鍒楄〃锛岀敤浜庣Щ鍔ㄧ锛?
const leafCategories = computed(() => getLeafCategories())

// 鎸夊垎绫诲垎缁勭殑缃戠珯
const categoriesWithItems = computed(() => {
  // 鑾峰彇"绔欓暱鎺ㄨ崘"鍒嗙被
  const featuredCategory = categories.find(cat => cat.id === 'all')
  const featuredItemsList = featuredCategory ? navData.filter(item => item.category === 'all').sort((a, b) => a.order - b.order) : []

  // 鑾峰彇鍏朵粬鍒嗙被锛堟帓闄ゅ弸鎯呴摼搴﹀垎绫伙紝鍥犱负瀹冩湁鍗曠嫭鐨勫睍绀哄尯鍩燂級
  const otherCategories = categories
    .filter(cat => cat.id !== 'all' && cat.id !== 'friendship-links')
    .map(cat => {
      let items: NavItem[] = []

      if (cat.children && cat.children.length > 0) {
        // 鏈夊瓙鍒嗙被锛氳幏鍙栨墍鏈夊瓙鍒嗙被鐨勭綉绔?
        const childIds = cat.children.map(child => child.id)
        items = navData.filter(item => childIds.includes(item.category))

        // 涓烘瘡涓瓙鍒嗙被鍒嗛厤瀵瑰簲鐨勭綉绔?
        const childrenWithItems = cat.children.map(child => ({
          ...child,
          items: navData.filter(item => item.category === child.id).sort((a, b) => a.order - b.order)
        })).filter(child => child.items.length > 0)

        return {
          ...cat,
          items: items.sort((a, b) => a.order - b.order),
          children: childrenWithItems
        }
      } else {
        // 娌℃湁瀛愬垎绫伙細鐩存帴鍖归厤璇ュ垎绫荤殑缃戠珯
        items = navData.filter(item => item.category === cat.id)

        return {
          ...cat,
          items: items.sort((a, b) => a.order - b.order),
          children: undefined
        }
      }
    })
    .filter(cat => cat.items.length > 0)

  // 濡傛灉鏈夌珯闀挎帹鑽愮珯鐐癸紝灏嗗叾浣滀负绗竴涓垎绫?
  if (featuredItemsList.length > 0 && featuredCategory) {
    return [
      {
        ...featuredCategory,
        items: featuredItemsList,
        children: undefined
      },
      ...otherCategories
    ]
  }

  return otherCategories
})

// 瀹為檯鐢ㄤ簬绛涢€夌殑鍒嗙被ID
const effectiveCategoryId = computed(() => {
  const cat = getCategoryById(activeCategory.value)
  if (cat && 'parentId' in cat) {
    return (cat as any).parentId
  }
  return activeCategory.value
})

// 杩囨护鍚庣殑缃戠珯锛堟悳绱㈡椂浣跨敤锛?
const filteredItems = computed<NavItem[]>(() => {
  let result = [...navData]

  if (effectiveCategoryId.value !== 'all') {
    const selectedCat = getCategoryById(activeCategory.value)

    if (selectedCat) {
      // 妫€鏌ユ槸鍚︽槸瀛愬垎绫伙紙鏈?parentId锛?
      if ('parentId' in selectedCat) {
        // 瀛愬垎绫伙細鍙尮閰嶈瀛愬垎绫荤殑缃戠珯
        result = result.filter(item => item.category === activeCategory.value)
      } else {
        // 鐖跺垎绫伙細鍖归厤璇ュ垎绫诲強鍏舵墍鏈夊瓙鍒嗙被鐨勭綉绔?
        const parentCat = selectedCat as Category
        if (parentCat.children && parentCat.children.length > 0) {
          const childIds = parentCat.children.map(child => child.id)
          result = result.filter(item =>
            item.category === parentCat.id || childIds.includes(item.category)
          )
        } else {
          // 娌℃湁瀛愬垎绫荤殑涓€绾у垎绫伙細鍙尮閰嶈鍒嗙被鐨勭綉绔?
          result = result.filter(item => item.category === parentCat.id)
        }
      }
    }
  }

  const q = query.value.trim().toLowerCase()
  if (q) {
    result = result.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags?.some(tag => tag.toLowerCase().includes(q))
    )
  }

  return result.sort((a, b) => a.order - b.order)
})
</script>
