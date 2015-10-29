/**
 * @module
 * @prototype {Function} __resizeHandler
 * @dependencies [ SmoothScrollbar ]
 */

import { SmoothScrollbar } from '../smooth_scrollbar';

export { SmoothScrollbar };

/**
 * @method
 * @internal
 * Wheel event handler builder
 *
 * @param {Object} option
 *
 * @return {Function}: event handler
 */
let __resizeHandler = function() {
    this.$on('resize', window, this.__updateThrottle);
};

Object.defineProperty(SmoothScrollbar.prototype, '__resizeHandler', {
    value: __resizeHandler,
    writable: true,
    configurable: true
});
