<template>
  <KdPage title="列表组件" gray>
    <KdList>
      <KdListGroup>
        <KdListCard>
          <KdGrid :items="items" />
        </KdListCard>
      </KdListGroup>
      <KdListGroup
        more
        title="菜单列表小标题"
        note="描述文本"
        tips="它是一个描述文本，位于白色卡片之外的描述。"
      >
        <KdListCard>
          <KdCell title="列表名称" desc="辅助文本" append append-type="switch" :hover="false">
            <KdSwitch slot="append" />
          </KdCell>
          <KdCell title="列表名称" arrow append append-type="avatar">
            <KdAvatar slot="append" :src="src" size="m" circle />
          </KdCell>
        </KdListCard>
        <KdListCard>
          <KdCell title="列表名称" note="描述文本" prepend arrow>
            <KdAvatar slot="prepend" :src="src" size="xl" circle />
          </KdCell>
          <KdCell title="列表名称" prepend append append-type="button" :hover="false">
            <KdAvatar slot="prepend" :src="src" size="xl" circle />
            <KdButton slot="append" type="light" dropdown>操作按钮</KdButton>
          </KdCell>
          <KdCell title="列表名称" prepend append note="描述文本" append-type="text" :hover="false">
            <KdAvatar slot="prepend" :src="src" size="xl" circle />
          </KdCell>
        </KdListCard>
      </KdListGroup>
      <KdRadioGroup>
        <KdListGroup>
          <KdListCard>
            <KdCell title="列表名称" prepend>
              <KdRadio mark slot="prepend" :value="1" checked />
            </KdCell>
            <KdCell title="列表名称" prepend>
              <KdRadio mark slot="prepend" :value="2" />
            </KdCell>
          </KdListCard>
        </KdListGroup>
      </KdRadioGroup>
      <KdCheckboxGroup :value="checkList">
        <KdListGroup>
          <KdListCard>
            <KdCell title="列表名称" prepend>
              <KdCheckbox slot="prepend" :value="1" />
            </KdCell>
            <KdCell title="列表名称" prepend>
              <KdCheckbox slot="prepend" :value="2" />
            </KdCell>
            <KdCell title="列表名称" prepend>
              <KdCheckbox slot="prepend" :value="2" />
            </KdCell>
          </KdListCard>
        </KdListGroup>
      </KdCheckboxGroup>
      <KdListGroup>
        <KdListCard>
          <KdCell icon="dialog" title="列表名称" />
          <KdCell icon="dialog" title="列表名称" />
        </KdListCard>
      </KdListGroup>
    </KdList>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdCell from '@/components/cell.vue'
import KdGrid from '@/components/grid.vue'
import KdAvatar from '@/components/avatar.vue'
import KdSwitch from '@/components/switch.vue'
import KdButton from '@/components/button.vue'
import KdList from '@/components/list.vue'
import KdListCard from '@/components/list-card.vue'
import KdListGroup from '@/components/list-group.vue'
import KdCheckbox from '@/components/checkbox.vue'
import KdCheckboxGroup from '@/components/checkbox-group.vue'
import KdRadio from '@/components/radio.vue'
import KdRadioGroup from '@/components/radio-group.vue'
import { ref } from '@minivue/core'

const checkList = ref<number[]>([])
const items = [
  {
    icon: 'dialog',
    text: '编辑',
    action: 'a1',
  },
  {
    icon: 'dialog',
    text: '复制',
    action: 'a2',
  },
  {
    icon: 'dialog',
    text: '高亮',
    action: 'a3',
  },
  {
    icon: 'dialog',
    text: '下划线',
    action: 'a4',
  },
  {
    icon: 'dialog',
    text: '删除批注',
    action: 'a5',
  },
  {
    icon: 'dialog',
    text: '词典',
    action: 'a6',
  },
  {
    icon: 'dialog',
    text: '查找',
    action: 'a7',
  },
  {
    icon: 'dialog',
    text: '朗读',
    action: 'a8',
  },
  {
    icon: 'dialog',
    text: '分享',
    action: 'a9',
  },
]
const src = 'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png'
</script>

<config lang="json">
{
  "navigationBarTitleText": "列表组件",
  "disableScroll": true
}
</config>
