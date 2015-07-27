'use strict';

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    onDeviceReady();
}

function onDeviceReady() {
    // Now safe to use device APIs
    console.log('Cordova ready!');
}
