var getSimpleObject = function (obj) {
    var result = {},
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key) && ((typeof obj !== "object" || obj === null) && !(obj instanceof Array))) {
            result[key] = obj[key];
        }
    }

    return result;
};