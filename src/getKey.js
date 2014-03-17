var getKey = function (success, error) {
    this.collect(function (data) {
        if (typeof success === 'function') {
            success(stringify(data));
        }
    }, error);
};