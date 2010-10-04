/*
 * Display or remove a message in an element
 */
(function($){
  
  var _add, _remove;
  
  $.fn.messenger = function(action, options){
    opts = options ? $.extend({}, $.fn.messenger.defaults, options) : $.fn.messenger.defaults;
    $this = this;
    
    this.each(function(){
      
      // Attach options to this element
      this.messenger_options = opts;
      
      // Action
      switch(action){
        case 'add':
          _add($(this), opts);
          break;
        default:
          $.fn.messenger.remove($(this), opts);
      }
    });
    
    return this;
  };
  
  _add = function($this, opts){
    var messengerContainer = $(opts.messengerContainer).addClass(opts.messengerClass).html(opts.messengerContent);
    if ($(opts.messengerClass).length <= 0) {
      messengerContainer.hide().appendTo($this).fadeIn(300);
    }
    if ($(opts.autoRemove)) {
      setTimeout(function(){
        $.fn.messenger.remove($this, opts);
      }, opts.autoRemoveDelay);
    }
  }
    
  $.fn.messenger.remove = function($this, opts){
    
    // Set options
    if ($this[0].messenger_options) {
      opts = opts ? $.extend({}, this.messenger_options, opts) : this.messenger_options;
    } else {
      opts = opts ? $.extend({}, $.fn.messenger.defaults, opts) : $.fn.messenger.defaults;
    };
    
    // Remove messenger
    $('.' + opts.messengerClass, $this).fadeOut(300, function(){
      $(this).remove();
    });
  }
  
  $.fn.messenger.defaults = {
    messengerContainer:  '<div></div>',
    messengerClass:      'messenger',
    messengerContent:    'loading',
    autoRemove:          false,
    autoRemoveDelay:     2000 
  }
  
})(jQuery);