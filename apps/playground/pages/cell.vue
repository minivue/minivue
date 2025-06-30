<template>
  <KdPage title="单元格组件">
    <KdCell title="列表名称" desc="辅助文本" append :hover="false">
      <KdSwitch slot="append" />
    </KdCell>
    <KdCell title="列表名称" append arrow>
      <KdAvatar slot="append" :src="src" size="m" circle />
    </KdCell>

    <KdCell title="列表名称" note="描述文本" prepend arrow>
      <KdAvatar slot="prepend" :src="src" size="xl" circle />
    </KdCell>
    <KdCell title="列表名称" prepend append :hover="false">
      <KdAvatar slot="prepend" :src="src" size="xl" circle />
      <KdButton slot="append" type="light" dropdown>操作按钮</KdButton>
    </KdCell>
    <KdRadioGroup>
      <KdCell title="列表名称" prepend>
        <KdRadio mark slot="prepend" :value="1" checked />
      </KdCell>
      <KdCell title="列表名称" prepend>
        <KdRadio mark slot="prepend" :value="2" />
      </KdCell>
    </KdRadioGroup>
    <KdCheckboxGroup :value="checkList">
      <KdCell title="列表名称" prepend>
        <KdCheckbox slot="prepend" :value="1" />
      </KdCell>
      <KdCell title="列表名称" prepend>
        <KdCheckbox slot="prepend" :value="2" />
      </KdCell>
      <KdCell title="列表名称" prepend>
        <KdCheckbox slot="prepend" :value="2" />
      </KdCell>
      <KdCell icon="more" title="列表名称" />
      <KdCell icon="more" title="列表名称" />
    </KdCheckboxGroup>
  </KdPage>
</template>

<script setup lang="ts">
import {
  KdPage,
  KdCell,
  KdAvatar,
  KdSwitch,
  KdButton,
  KdCheckbox,
  KdCheckboxGroup,
  KdRadio,
  KdRadioGroup,
} from '@minivue/ui'

import { ref } from '@minivue/core'

const checkList = ref<number[]>([])
const src = 'https://s1.imagehub.cc/images/2025/05/14/7f5d2873add5733f8d4cfc2dadf903c1.png'
</script>

<config lang="json">
{
  "navigationBarTitleText": "单元格组件",
  "disableScroll": true
}
</config>
