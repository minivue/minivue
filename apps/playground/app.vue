<style>
@font-face {
  font-family: copilot-icon;
  src: url('https://at.alicdn.com/t/c/font_4009688_87syzwcjawp.ttf?t=1742439776822')
    format('truetype');
}

.kd-icon--deepseek::before {
  content: '\e6f5';
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
  "resizable": true,
  "frameset": false,
  "renderer": "skyline",
  "componentFramework": "glass-easel",
  "rendererOptions": {
    "skyline": {
      "defaultDisplayBlock": true
    }
  },
  "disableScroll": true,
  "lazyCodeLoading": "requiredComponents",
  "style": "v2"
}
</config>
