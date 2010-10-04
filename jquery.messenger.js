/*
 * Display or remove a message in an element
 */
(function($){
  
  var _add, _remove; 
  $.fn.messenger = function(action, options){
    opts = options ? $.extend({}, $.fn.messenger.defaults, options) : $.fn.messenger.defaults;
    $this = this;
    this.each(function(){
      switch(action){
        case 'add':
          _add($(this), opts);
          break;
        default:
          _remove($(this), opts);
      }
    });
    return this;
  };
  
  _add = function($this, opts){
    
    var messengerContainer = $(opts.messengerContainer).addClass(opts.messengerClass).html(opts.messengerContent);
    if ($(opts.messengerClass).length <= 0) {
      messengerContainer.hide().appendTo($this).fadeIn(300);
    }
  }
    
  _remove = function($this, opts){
    opts = $.fn.messenger.defaults;
    $('.' + opts.messengerClass, $this).fadeOut(300, function(){
      $(this).remove();
    })
  }
  
  $.fn.messenger.defaults = {
    messengerContainer:  '<div></div>',
    messengerClass:      'messenger',
    messengerContent:    'loading'
  }
  
})(jQuery);