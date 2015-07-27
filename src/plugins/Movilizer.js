var Movilizer = function () {
};

Movilizer.prototype.readGlobalVariable = function (varName, successCB, errorCB) {
    result = {};
    if (varName == 'SampleVar') {
        result = "Hello John Doe!";
    }
    successCB(result);
};


Movilizer.prototype.queryMasterData = function (pool, group, filter, returnSpec, successCB, errorCB) {
    result = {};
    successCB(result);
};

//Triggers OK Event on user interface.
Movilizer.prototype.triggerOKEvent = function() {
    alert('Triggered OK event');
};

//Triggers Back Event on user interface.
Movilizer.prototype.triggerBackEvent = function() {
    alert('Triggered Back event');
};

var movilizer = new Movilizer();