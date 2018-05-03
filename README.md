# transitionend-promise
Promisifies the transitionend js event for CSS transitions

## Installation

```
npm install transitionend-promise
```

## Usage

```css
    #foo {
        transition: 1s transform;
        transform: rotate(0deg);
    }
    
    .do-a-barrel-roll {
        transform: rotate(360deg);
    }
```

```javascript
    const transitionEnd = require('transitionend-promise');

    var myDOMEl = document.querySelector('#foo');

    myDOMEl.classList.add('do-a-barrel-roll');

    transitionPromise(myDOMEl, 'transform')
        .then(evt => {
            console.log('We did a barrel roll and I have the origin transitionend event object to prove it.', evt);
        });
```
