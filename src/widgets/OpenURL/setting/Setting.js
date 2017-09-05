define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting'
],
function(declare, BaseWidgetSetting) {

  return declare([BaseWidgetSetting], {
    baseClass: 'open-url-setting',

    postCreate: function(){
      //the config object is passed in
      this.setConfig(this.config);
    },

    setConfig: function(config){
      this.urlInput.value = config.url;
      this.labelInput.value = config.label;
    },

    getConfig: function(){
      //WAB will get config object through this method
      return {
        url: this.urlInput.value,
        label: this.labelInput.value
      };
    }
  });
});
