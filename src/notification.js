/**
 * @package Reactificate Notification
 * @param wsUri {string} An address to websocket server.
 * @param options {string|string[]} Additional websocket options
 * @constructor
 */
module.exports = (function () {
    function RNotification() {
        let _this = this;
        let _notification;

        this.request = function () {
            if (_this.isDeclined()) {
                return new Promise(function (resolve, reject) {
                    reject();
                });
            }

            return Notification.requestPermission();
        };

        this.send = function (object) {
            _notification = new Notification(object.title, object);

            if (object.hasOwnProperty('redirect')) {
                _notification.addEventListener('click', () => {
                    window.location = object.redirect;
                });
            }
        }

        this.getNotification = () => _notification;

        this.isDefault = function () {
            return 'default' === Notification.permission;
        };

        this.isGranted = function () {
            return 'granted' === Notification.permission;
        };

        this.isDeclined = function () {
            return 'declined' === Notification.permission;
        };


        setTimeout(() => _this.request(), 50);
    }


    return RNotification;
})();