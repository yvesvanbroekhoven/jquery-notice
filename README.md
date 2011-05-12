# jQuery notice

Add or remove a notice in an element

## Requirements

jQuery 1.4 or higher

## How to?

```javascript
$("your-selector").notice("add", {
  content: "very good!"
});
```

## Options

```javascript
wrap:             '<div></div>',
cssClass:         'notice',
content:          'loading',
autoRemove:       false,
autoRemoveDelay:  2000 ,
afterRemoveClb:   function(){}
```



