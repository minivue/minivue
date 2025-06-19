<style>
@font-face {
  font-family: copilot;
  src: url('https://at.alicdn.com/t/c/font_4624048_n6619bp65ik.ttf') format('truetype');
}

.kd-icon {
  font-family: kdesign, copilot !important;
}

.kd-icon--menu::before {
  content: '\e7a8';
}

.kd-icon--dialog::before {
  content: '\e6e8';
}

.kd-icon--all::before {
  content: '\e6e9';
}

.kd-icon--url::before {
  content: '\e6e5';
}

.kd-icon--note::before {
  content: '\e6e6';
}

.kd-icon--pic::before {
  content: '\e6e7';
}
</style>

<config lang="json">
{
  "pages": [
    "pages/index/index",
    "pages/button/button",
    "pages/controls/controls",
    "pages/divider/divider",
    "pages/toast/toast",
    "pages/link/link",
    "pages/loading/loading",
    "pages/progress/progress",
    "pages/message-bar/message-bar",
    "pages/bdage/bdage",
    "pages/skeleton/skeleton",
    "pages/input/input",
    "pages/avatar/avatar",
    "pages/tabbar/tabbar",
    "pages/hover-toolbar/hover-toolbar",
    "pages/tooltip/tooltip",
    "pages/popover/popover",
    "pages/drawer/drawer",
    "pages/actionsheet/actionsheet",
    "pages/tabs/tabs",
    "pages/dialog/dialog",
    "pages/cell/cell",
    "pages/grid/grid",
    "pages/list/list"
  ],
  "subpackages": [
    {
      "root": "account",
      "pages": ["index/index"],
      "plugins": {
        "account": {
          "version": "4.1.9",
          "provider": "wxe5f87d6a233b5aab"
        }
      }
    }
  ],
  "window": {
    "navigationBarTitleText": "WPS 灵犀",
    "navigationBarBackgroundColor": "@navBgColor",
    "navigationBarTextStyle": "@navTxtStyle",
    "navigationStyle": "custom"
  },
  "themeLocation": "theme.json",
  "darkmode": true,
  "resizable": false,
  "frameset": false,
  "renderer": "skyline",
  "componentFramework": "glass-easel",
  "rendererOptions": {
    "skyline": {
      "defaultDisplayBlock": true
    }
  },
  "lazyCodeLoading": "requiredComponents",
  "style": "v2"
}
</config>
