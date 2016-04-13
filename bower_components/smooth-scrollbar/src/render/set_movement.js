/**
 * @module
 * @prototype {Function} __setMovement
 */

import { pickInRange } from '../utils/';
import { SmoothScrollbar } from '../smooth_scrollbar';

export { SmoothScrollbar };

function __setMovement(deltaX = 0, deltaY = 0) {
    const {
        options,
        movement
    } = this;

    this.__updateThrottle();

    let limit = this.__getDeltaLimit();

    movement.x = pickInRange(deltaX * options.speed, ...limit.x);
    movement.y = pickInRange(deltaY * options.speed, ...limit.y);
};

Object.defineProperty(SmoothScrollbar.prototype, '__setMovement', {
    value: __setMovement,
    writable: true,
    configurable: true
});