(function () {
    var selectPosition = {};

    selectPosition.getElement = function (id) {
        return document.getElementById(id)
    };
    
    selectPosition.getWrapForContent = function (elClass) {
        return document.querySelectorAll(elClass)[0];
    };

    selectPosition.getValue = function () {
        return selectPosition.getElement('position').value;
    };

    selectPosition.setValueForBlock = function () {
        var firstValue = selectPosition.getElement('position').getElementsByTagName('option')[0].value;
        var currentValue = selectPosition.getValue();
        if (firstValue == currentValue) {
            selectPosition.getWrapForContent('.position-select__text').style.visibility = 'hidden';
        } else {
            selectPosition.getWrapForContent('.position-select__text').style.visibility = 'visible';
            selectPosition.getWrapForContent('.position-select__text > h4').innerHTML = selectPosition.getValue();
        }
    };

    selectPosition.events = function () {
        var self = this;
        selectPosition.getElement('position').addEventListener('change', function () {
            self.setValueForBlock();
        });
    };

    selectPosition.init = function () {
        this.events();
    };

    selectPosition.init();

})();