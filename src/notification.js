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
        }

        this.getNotification = () => _notification;

        this.isDefault = function () {
            return 'default' === RNotification.permission;
        };

        this.isGranted = function () {
            return 'granted' === RNotification.permission;
        };

        this.isDeclined = function () {
            return 'declined' === RNotification.permission;
        };


        setTimeout(() => _this.request(), 50);
    }


    return RNotification;
})();