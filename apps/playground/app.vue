<style>
.hello {
  font-size: 20px;
  color: #333;
  background-color: var(--kd-color-text-primary);
}
</style>

<config lang="json">
{
  "pages": ["pages/index/index", "pages/about/about"],
  "window": {
    "navigationBarTitleText": "WPS 灵犀",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "navigationStyle": "custom"
  },
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
