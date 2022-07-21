import nipplejs from 'nipplejs';
import autobind from 'autobind-decorator';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import cx from 'classnames';

/**
 * A react wrapper component for `nipplejs`.
 * @see https://www.npmjs.com/package/nipplejs
 * @author Jovica Aleksic <jovica.aleksic@loopmode.de>
 */

interface NippleProps {
    className?: string,
    options?: {
                 color?: string,
                 size?: number,
                 threshold?: number, // before triggering a directional event
                 fadeTime?: number, // transition time
                 multitouch?: boolean,
                 maxNumberOfNipples?: number, // when multitouch, what is too many?
                 dataOnly?: boolean, // no dom element whatsoever
                 position?: any, // preset position for 'static' mode
                 mode?: "dynamic" | "static" | "semi", // 'dynamic', 'static' or 'semi'
                 restJoystick?: boolean,
                 restOpacity?: number, // opacity when not 'dynamic' and rested
                 catchDistance?: number
         },
    static?: boolean,
    onStart?: (evt : JoystickEventTypes, data: JoystickOutputData) => void,
    onEnd?: (evt : JoystickEventTypes, data: JoystickOutputData) => void,
    onMove?: (evt : JoystickEventTypes, data: JoystickOutputData) => void,
    onDir?: () => void,
    onPlain?: () => void,
    onShown?: () => void,
    onHidden?: () => void,
    onPressure?: () => void,
    onCreated?: (joystick: JoystickManager) => void,
    onDestroy?: () => void
    style?: any
}

interface IState {
    joyOpts: any;
    joySize: number;
}

export default class Nipple extends Component<NippleProps, IState> {
    /* eslint-disable no-trailing-spaces */
    /**
     * Component propTypes
     *
     * Any additional (unknown) props will be passed along as attributes of the created DOM element.
     *
     * @property {string} className - A css classname for the DOM element
     * @property {object} options - An object with nipplejs options, see https://github.com/yoannmoinet/nipplejs#options
     * @property {boolean} static - A shortcut for setting the options `{mode: 'static', position: {top: '50%', left: '50%'}}`. Will override values in the `options` object.
     * @property {function} onCreated - Callback that is invoked with the created instance
     * @property {function} onDestroy - Callback that is invoked with the instance that is going to be destroyed
     * @property {function} onStart - Callback for the 'start' event handler, see https://github.com/yoannmoinet/nipplejs#start
     * @property {function} onEnd - Callback for the 'end' event handler, see https://github.com/yoannmoinet/nipplejs#end
     * @property {function} onMove - Callback for the 'move' event handler, see https://github.com/yoannmoinet/nipplejs#move
     * @property {function} onDir - Callback for the 'dir' event handler, see https://github.com/yoannmoinet/nipplejs#dir
     * @property {function} onPlain - Callback for the 'plain' event handler, see https://github.com/yoannmoinet/nipplejs#plain
     * @property {function} onShown - Callback for the 'shown' event handler, see https://github.com/yoannmoinet/nipplejs#shown
     * @property {function} onHidden - Callback for the 'hidden' event handler, see https://github.com/yoannmoinet/nipplejs#hidden
     * @property {function} onPressure - Callback for the 'pressure' event handler, see https://github.com/yoannmoinet/nipplejs#pressure
     */
    /* eslint-enable no-trailing-spaces */
    private joystick?: JoystickManager;
    private _element: any;
    static get propTypes() {
        return {

        };
    }

    get ownProps() {
        return [
            'options',
            'static',
            'onStart',
            'onEnd',
            'onMove',
            'onDir',
            'onPlain',
            'onShown',
            'onHidden',
            'onPressure',
            'onCreated'
        ];
    }
    get elementProps() {
        return Object.entries(this.props).reduce((result, [key, value]) => {
            if (this.ownProps.includes(key)) {
                return result;
            }
            // @ts-ignore
            result[key] = value;
            return result;
        }, {});
    }

    componentDidUpdate(prevProps: NippleProps) {
        if (!isEqual(prevProps.options, this.props.options)) {
            this.destroyJoystick();
            this.createJoystick(this.props);
        }
    }

    render() {
        return (
            <div {...this.elementProps} ref={this.handleElement} className={cx('Nipple', this.props.className)} />
        );
    }

    //-----------------------------------
    //
    // impl
    //
    //-----------------------------------

    @autobind
    handleElement(ref: any) {
        this._element = ref;
        if (ref) {
            this.createJoystick(this.props);
        } else if (this._element) {
            this.destroyJoystick();
        }
    }
    createJoystick(props : NippleProps) {
        const options = {
            zone: this._element,
            ...props.options
        };

        if (this.props.static) {
            options.mode = 'static';
            options.position = {
                top: '50%',
                left: '50%'
            };
        }

        const joystick = nipplejs.create(options);
        joystick.on('start', this.handleJoystickStart);
        joystick.on('end', this.handleJoystickEnd);
        joystick.on('move', this.handleJoystickMove);
        joystick.on('dir', this.handleJoystickDir);
        joystick.on('plain', this.handleJoystickPlain);
        joystick.on('shown', this.handleJoystickShown);
        joystick.on('hidden', this.handleJoystickHidden);
        joystick.on('pressure', this.handleJoystickPressure);

        this.joystick = joystick;

        if (props.onCreated) {
            props.onCreated(this.joystick);
        }
    }
    destroyJoystick() {
        if (this.joystick) {
            this.joystick.destroy();
            this.joystick = undefined;
        }
    }
    invokeCallback(type: string, evt: EventData, data: JoystickOutputData) {
        // @ts-ignore
        if (this.props[type]) {
            // @ts-ignore
            this.props[type](evt, data);
        }
    }
    @autobind
    handleJoystickStart(evt: EventData, data: JoystickOutputData) {
        this.invokeCallback('onStart', evt, data);
    }
    @autobind
    handleJoystickEnd(evt: EventData, data: JoystickOutputData) {
        this.invokeCallback('onEnd', evt, data);
    }
    @autobind
    handleJoystickMove(evt: EventData, data: JoystickOutputData) {
        this.invokeCallback('onMove', evt, data);
    }
    @autobind
    handleJoystickDir(evt: EventData, data: JoystickOutputData) {
        this.invokeCallback('onDir', evt, data);
    }
    @autobind
    handleJoystickPlain(evt: EventData, data: JoystickOutputData) {
        this.invokeCallback('onPlain', evt, data);
    }
    @autobind
    handleJoystickShown(evt: EventData, data: JoystickOutputData) {
        this.invokeCallback('onShown', evt, data);
    }
    @autobind
    handleJoystickHidden(evt: EventData, data: JoystickOutputData) {
        this.invokeCallback('onHidden', evt, data);
    }
    @autobind
    handleJoystickPressure(evt: EventData, data: JoystickOutputData) {
        this.invokeCallback('onPressure', evt, data);
    }
}