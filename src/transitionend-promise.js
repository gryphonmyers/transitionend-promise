var vendorPrefix = require('vendor-prefix').dash;

function parseDuration(val) {
    return val.slice(-1) === 's' ? Number(val.slice(0, -1)) * 1000 : Number(val)
}

module.exports = function(el, prop) {
    if (el.parentNode && vendorPrefix('transition')) {
        prop = prop ? vendorPrefix(prop) : null;
        var style = getComputedStyle(el);

        var durations = (style.transitionDuration || '').split(',');
        var properties = (style.transitionProperty || '').split(',');

        var timeout = properties.reduce((final, curr, ii) => {
            return curr === 'all' ? 
                Math.max(parseDuration(durations[ii]), final)
            : (curr && (!prop || curr === prop)) ? 
                Math.max(parseDuration(durations[ii]), final)
            : final;
        }, 0);

        return new Promise(function(resolve, reject){
            el.addEventListener('transitionend', function onTransitionEnd(e){
                if (e.target == el && (!prop || (Array.isArray(prop) ? prop.indexOf(e.propertyName) > -1 : prop == e.propertyName))) {
                    resolve(e);
                    el.removeEventListener('transitionend', onTransitionEnd);
                }
            });
            setTimeout(resolve, timeout);
        });
    } else {
        return Promise.resolve(null);
    }
}