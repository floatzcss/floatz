var floatz = {

   init : function() {
      // Initialize skip links
      // this.initSkiplinks();
      
      // Initialize skip link anchors
      // this.initSkiplinkAnchors();
      
      this.initForm();      
   },

   initForm : function() {

      if ($.browser.msie && $.browser.version == "6.0") {
         $(".flz_form input[type='text']").addClass("flz_textbox");
         $(".flz_form input[type='button']").addClass("flz_button");
      }
   }   
};
