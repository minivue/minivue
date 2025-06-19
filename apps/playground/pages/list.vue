<template>
  <KdPage title="列表组件" gray>
    <KdList>
      <KdListGroup more title="菜单列表小标题" note="描述文本">
        <KdListCard>
          <KdCell title="列表名称" desc="辅助文本" append :hover="false">
            <KdSwitch slot="append" />
          </KdCell>
          <KdCell title="列表名称" append arrow>
            <KdAvatar slot="append" :src="src" size="m" circle />
          </KdCell>
        </KdListCard>
      </KdListGroup>
      <KdListGroup tips="它是一个描述文本，位于白色卡片之外的描述。">
        <KdListCard>
          <KdCell title="列表名称" note="描述文本" prepend arrow>
            <KdAvatar slot="prepend" :src="src" size="xl" circle />
          </KdCell>
          <KdCell title="列表名称" prepend append :hover="false">
            <KdAvatar slot="prepend" :src="src" size="xl" circle />
            <KdButton slot="append" type="light" dropdown>操作按钮</KdButton>
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
        <KdCell icon="more" title="列表名称" />
        <KdCell icon="more" title="列表名称" />
      </KdListGroup>
    </KdList>
  </KdPage>
</template>

<script setup lang="ts">
import KdPage from '@/components/page.vue'
import KdCell from '@/components/cell.vue'
import KdList from '@/components/list.vue'
import KdListCard from '@/components/list-card.vue'
import KdListGroup from '@/components/list-group.vue'
import KdAvatar from '@/components/avatar.vue'
import KdSwitch from '@/components/switch.vue'
import KdButton from '@/components/button.vue'
import KdCheckbox from '@/components/checkbox.vue'
import KdCheckboxGroup from '@/components/checkbox-group.vue'
import KdRadio from '@/components/radio.vue'
import KdRadioGroup from '@/components/radio-group.vue'
import { ref } from '@minivue/core'

const checkList = ref<number[]>([])
const src = 'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png'
</script>

<config lang="json">
{
  "navigationBarTitleText": "列表组件",
  "disableScroll": true
}
</config>
