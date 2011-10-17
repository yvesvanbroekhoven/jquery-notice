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
   */
  _add = function(){
    
    var _this   = this
    ,   opts    = $(this).data('notice-opts')
    ,   $notice = $(opts.wrap).addClass(opts.cssClass).html(opts.content)
    ;
    
    // Only add one notice at the time in the same context
    if ($("." + opts.cssClass, this).length <= 0) {
      $notice
        .hide()
        .appendTo(this)
        .fadeIn(300, function(){
          _autoRemove.call(_this);
        });
    }
    
  };
  
  /*
   * Remove notice
   */
  _remove = function(){
    var _this   = this
    ,   opts    = $(this).data('notice-opts')
    ,   notice  = $("." + opts.cssClass, this)
    ;
    
    notice.fadeOut(300, function(){
      notice.remove();
      if ($.isFunction(opts.afterRemoveClb)){
        opts.afterRemoveClb.call(_this);
      }
    });
  };
  
  /*
   * Auto remove notice
   */
  _autoRemove = function(){
    var _this = this
    ,   opts  = $(this).data('notice-opts')
    ;
    
    if (opts.autoRemove) {
      setTimeout(function(){
        _remove.call(_this);
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
          _add.call(this);
          break;
        default:
          _remove.call(this);
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