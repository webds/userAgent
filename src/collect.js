var collect = function (success, error) {
    var i,
        obj,
        len = ActiveXObjects.length,
        ActiveXObject = window.ActiveXObject,
        data = {
            navigator: getSimpleObject(navigator),
            data: getSimpleObject(window.screen),
            ActiveXObjects: []
        };

    if (ActiveXObject) {
        for (i = 0; i < len; i++) {
            try {
                obj = new ActiveXObject(ActiveXObjects[i]);
                data.ActiveXObjects.push(ActiveXObjects[i]);
            } catch (e) {
            }
        }
    }

    if (navigator.mimeTypes) {
        data.mimeTypes = [];

        len = navigator.mimeTypes.length || 0;

        for (i = 0; i < len; i++) {
            data.mimeTypes.push(getSimpleObject(navigator.mimeTypes[i]));
        }
    }

    if (navigator.plugins) {
        data.plugins = [];

        len = navigator.plugins.length || 0;

        for (i = 0; i < len; i++) {
            data.plugins.push(getSimpleObject(navigator.plugins[i]));
        }
    }

    return data;
};