var getSimpleObject = function (obj) {
    var result = {},
        key;

    for (key in obj) {
        if (
            obj.hasOwnProperty(key) && (
                (
                    typeof obj[key] !== "object" ||
                    obj[key] == null ||
                    obj[key] instanceof Boolean ||
                    obj[key] instanceof Number ||
                    obj[key] instanceof String
                )
            )
        ) {
            result[key] = obj[key];
        }
    }

    return result;
};