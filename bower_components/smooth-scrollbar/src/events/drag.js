/**
 * @module
 * @prototype {Function} __dragHandler
 */

 import { SmoothScrollbar } from '../smooth_scrollbar';
 import {
    getOriginalEvent,
    getPosition,
    getTouchID,
    pickInRange,
    setStyle
} from '../utils/index';

 export { SmoothScrollbar };

 let __dragHandler = function() {
    const { container, content } = this.targets;

    let isDrag = false;
    let animation = undefined;
    let targetHeight = undefined;

    Object.defineProperty(this, '__isDrag', {
        get() {
            return isDrag;
        },
        enumerable: false
    });

    let scroll = ({ x, y }) => {
        if (!x && !y) return;

        this.__setMovement(x, y);

        animation = requestAnimationFrame(() => {
            scroll({ x, y });
        });
    };

    this.__addEvent(document, 'dragover mousemove touchmove', (evt) => {
        if (!isDrag || this.__ignoreEvent(evt)) return;
        cancelAnimationFrame(animation);
        evt.preventDefault();

        const dir = this.__getPointerTrend(evt, targetHeight);

        scroll(dir);
    });

    this.__addEvent(container, 'dragstart', (evt) => {
        if (this.__ignoreEvent(evt)) return;

        setStyle(content, {
            'pointer-events': 'auto'
        });

        targetHeight = evt.target.clientHeight;
        cancelAnimationFrame(animation);
        this.__updateBounding();
        isDrag = true;
    });
    this.__addEvent(document, 'dragend mouseup touchend blur', (evt) => {
        if (this.__ignoreEvent(evt)) return;
        cancelAnimationFrame(animation);
        isDrag = false;
    });
 };

 Object.defineProperty(SmoothScrollbar.prototype, '__dragHandler', {
     value: __dragHandler,
     writable: true,
     configurable: true
 });
