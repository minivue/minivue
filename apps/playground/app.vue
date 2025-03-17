<style>
@font-face {
  font-family: copilot-icon;
  src: url('https://at.alicdn.com/t/c/font_4624048_0yk3r1fowps9.woff2') format('woff2');
}

.kd-icon--deepseek::before {
  content: '\e6fa';
}
</style>

<config lang="json">
{
  "pages": ["pages/index/index"],
  "subpackages": [
    {
      "root": "account",
      "pages": ["index/index"],
      "plugins": {
        "account": {
          "version": "4.1.8",
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
  "resizable": true,
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
