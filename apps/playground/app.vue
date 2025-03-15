<style>
.hello {
  font-size: 20px;
  color: #333;
  background-color: var(--kd-color-text-primary);
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
