/**
 * @package Reactificate Event Emitter
 * @constructor
 */
module.exports = (function () {
    function EventEmitter () {
        let events = {
            'on': {},
            'once': {}
        };

        this.on = function (name, listener) {
            if (!events['on'][name]) {
                events['on'][name] = [];
            }

            events['on'][name].push(listener);
        };

        this.once = function (name, listener) {
            if (!events['once'][name]) {
                events['once'][name] = [];
            }

            events['once'][name].push(listener);
        };

        this.dispatch = function (name, data = []) {
            let regularEvent = events['on'];
            if (regularEvent.hasOwnProperty(name)) {
                regularEvent[name].forEach(function (listener) {
                    listener(...data)
                });
            }

            let onceEvent = events['once'];
            if (onceEvent.hasOwnProperty(name)) {
                onceEvent[name].forEach(function (listener) {
                    listener(data);
                });

                delete onceEvent[name];
            }
        }
    }

    return EventEmitter;
})();
