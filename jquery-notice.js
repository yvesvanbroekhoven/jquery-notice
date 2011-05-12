/*
 * jQuery notice
 * Display or remove a notice in an element
 *
 * Author: Yves Van Broekhoven
 */
(function($){
  
  var _add
  ,   _remove
  ,   _autoRemove
  ;
  
  /*
   * Add notice
   * @params ctx, Current context
   */
  _add = function(ctx){
    var opts    = ctx.data('notice-opts');
    var notice  = $(opts.wrap).addClass(opts.cssClass).html(opts.content);
    
    // Only add one notice at the time in the same context
    if ($("." + opts.cssClass, ctx).length <= 0) {
      notice.hide()
            .appendTo(ctx)
            .fadeIn(300, function(){
                _autoRemove(ctx);
            });
    }
    
  };
  
  /*
   * Remove notice
   * @params ctx, Current context
   */
  _remove = function(ctx){
    var opts    = ctx.data('notice-opts');
    var notice  = $("." + opts.cssClass, ctx);
    notice.fadeOut(300, function(){
      notice.remove();
      if ($.isFunction(opts.afterRemoveClb)){
        opts.afterRemoveClb.call(ctx);
      }
    });
  };
  
  /*
   * Auto remove notice
   * @params ctx, Current context
   */
  _autoRemove = function(ctx){
    var opts  = ctx.data('notice-opts');
    
    if (opts.autoRemove) {
      
      setTimeout(function(){
        _remove(ctx);
      }, opts.autoRemoveDelay);
    }
  };
  
  /*
   * Public API
   * @params action, "add" or "remove"
   * @params options, see defaults
   */
  $.fn.notice = function(action, options){
    
    // Extend defaults with options
    var opts = options ? $.extend({}, $.fn.notice.defaults, options) : $.fn.notice.defaults;
    
    return $(this).each(function(){
      $this = $(this);
      // Attach options to this element
      $this.data('notice-opts', opts);
      
      // Action
      switch(action){
        case 'add':
          _add($this, opts);
          break;
        default:
          _remove($this, opts);
      }
      
    });

  };
  
  /*
   * Default options
   */
  $.fn.notice.defaults = {
    wrap:             '<div></div>',
    cssClass:         'notice',
    content:          'loading',
    autoRemove:       false,
    autoRemoveDelay:  2000 ,
    afterRemoveClb:   function(){}
  };
  
})(jQuery);