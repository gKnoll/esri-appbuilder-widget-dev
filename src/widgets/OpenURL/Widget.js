define([
  'dojo/_base/declare',
  'jimu/BaseWidget'
], function(
  declare,
  BaseWidget
) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'open-url',
    // this property is set by the framework when widget is loaded.
    // name: 'OpenURL',
    // add additional properties here

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('OpenURL::postCreate');
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('OpenURL::startup');
    // },

    // onOpen: function(){
    //   console.log('OpenURL::onOpen');
    // },

    // onClose: function(){
    //   console.log('OpenURL::onClose');
    // },

    // onMinimize: function(){
    //   console.log('OpenURL::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('OpenURL::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('OpenURL::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('OpenURL::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('OpenURL::onPositionChange');
    // },

    // resize: function(){
    //   console.log('OpenURL::resize');
    // }

    //methods to communication between widgets:

  });

});
