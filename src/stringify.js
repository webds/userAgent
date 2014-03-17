var stringify = function (data) {
    var key,
        i,
        len,
        isNeedEscape,
        result = "";

    if (data instanceof Array) {
        len = data.length;
        result += "[";

        for (i = 0; i < len; i++) {
            result += stringify(data[i]);

            if (i < len - 1) {
                result += ",";
            }
        }

        result += "]";
    } else if (
        typeof data === "object" &&
            data !== null && !(
                data instanceof Number ||
                data instanceof String ||
                data instanceof Boolean
            )
    ) {
        result += "{";

        for (key in data) {
            if (data.hasOwnProperty(key)) {
                result += '"' + key + '":' + stringify(data[key]) + ",";
            }
        }

        result = result.replace(/,$/, '') + "}";
    } else {
        isNeedEscape = (
            !(
                data === null ||
                    typeof data === "boolean" ||
                    typeof data === "number" ||
                    data instanceof Boolean ||
                    data instanceof Number
            )
        );

        if (isNeedEscape && data) {
            data = String(data).replace(/["]/g, '\\"');
        }

        result += (isNeedEscape ? '"' : "") + data + (isNeedEscape ? '"' : "");
    }

    return result;
};