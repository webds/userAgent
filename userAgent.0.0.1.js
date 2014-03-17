// https://github.com/webschik/userAgent
(function (window, document, navigator, undefined) {
var ua = ((navigator && navigator.userAgent) || "").toLowerCase(),
    ActiveXObjects = [
        'ShockwaveFlash.ShockwaveFlash',
        'AcroPDF.PDF',
        'PDF.PdfCtrl',
        'QuickTime.QuickTime',
        'QuickTimeCheckObject.QuickTimeCheck',
        'rmocx.RealPlayer G2 Control',
        'rmocx.RealPlayer G2 Control.1',
        'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
        'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
        'RealPlayer',
        'SWCtl.SWCtl',
        'WMPlayer.OCX'
    ];
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
var os = {
    name: "",
    isUnix: (/unix/).test(ua),
    isLinux: (/linux/).test(ua),
    isIrix: (/irix/).test(ua),
    isMac: (/mac/).test(ua),
    isSun: (/sun/).test(ua),
    isFreeBSD: (/freebsd/).test(ua),
    isWindows: (/win/).test(ua),
    isWindowsPhone: (/windows\s+phone/).test(ua),
    isIOS: (/ios/).test(ua),
    isAndroid: (/android/).test(ua),
    isTouch: (/touch|phone/).test(ua)
};

if (os.isUnix) {
    os.name = "Unix";
} else if (os.isLinux) {
    os.name = "Linux";
} else if (os.isIrix) {
    os.name = "Irix";
} else if (os.isMac) {
    os.name = "MacOS";
} else if (os.isSun) {
    os.name = "SunOS";
} else if (os.isFreeBSD) {
    os.name = "FreeBSD";
} else if (os.isWindows) {
    if (/95/.test(ua)) {
        os.name = "Windows 95";
    } else if (/98/.test(ua)) {
        os.name = "Windows 98";
    } else if (/2000/.test(ua)) {
        os.name = "Windows 2000";
    } else if (/windows\s+nt\s+6\.1/.test(ua)) {
        os.name = "Windows 7";
    } else if (/windows\s+nt\s+6\.2/.test(ua)) {
        os.name = "Windows 8";
    } else if (/windows\s+nt\s+6\.0/.test(ua)) {
        os.name = "Windows Vista";
    } else if (/Windows/.test(ua)) {
        os.name = "Windows XP";
    } else {
        os.name = "Windows 3.1";
    }
}
var version = (
        (/(?:msie\s([0-9a-z,.]+);)/).exec(ua) || // msie
        (/(?:version\/([0-9a-z,.]+))$/).exec(ua) || //opera
        (/(?:chrome\/([0-9a-z,.]+)\s)/).exec(ua) || //chrome
        (/(?:firefox\/([0-9a-z,.]+))$/).exec(ua) || //firefox
        (/(?:version\/([0-9a-z,.]+)\s)/).exec(ua) || //safari
        []
    )[1] || null,
    versionArr,
    versionAsNumber = 0,
    browser;

if (version) {
    // (14.0b.1)
    versionArr = version.replace(/[^0-9\.,]/, '').split(/[\.,]/);
    versionAsNumber = +(versionArr.shift() + '.' + versionArr.join('')) || versionAsNumber;
}

browser = {
    version: version,
    versionAsNumber: versionAsNumber,

    isIPhone: (/iphone/).test(ua),

    isIPad: (/ipad/).test(ua),

    isIPod: (/ipod/).test(ua),

    isIPadWebView: (/applewebkit/).test(ua) && (/mobile/).test(ua),

    isOpera: (/'opera'/).test(ua),

    isChrome: (/chrome/).test(ua),

    isFireFox: (/firefox/).test(ua),

    isIE: (/msie/).test(ua),

    isSafari: (/safari/).test(ua)
};

browser.isMobileDevice = browser.isIPad ||
    browser.isIPod ||
    browser.isIPhone ||
    browser.isIPadWebView ||
    os.isAndroid ||
    os.isIOS ||
    os.isWindowsPhone ||
    os.isTouch;
var collect = function (success, error) {
    var i,
        obj,
        len = ActiveXObjects.length,
        ActiveXObject = window.ActiveXObject,
        data = {
            browser: browser,
            os: os,
            support: support,
            timezone: new Date().getTimezoneOffset(),
            localStorageEnabled: typeof localStorage !== 'undefined',
            userDataEnabled: typeof userData !== 'undefined',
            javaEnabled: typeof navigator.javaEnabled === 'function' ? navigator.javaEnabled() : false,
            taintEnabled: typeof navigator.taintEnabled === 'function' ? navigator.taintEnabled() : false,
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

    this.network.getIP(function (ip) {
        if (ip) {
            data.network = {
                ip: ip
            };
        }
        if (typeof success === "function") {
            success(data);
        }
    }, function () {
        if (typeof success === "function") {
            success(data);
        }
    });
};
var getKey = function (success, error) {
    this.collect(function (data) {
        if (typeof success === 'function') {
            success(stringify(data));
        }
    }, error);
};
var grepSDP = function (sdp) {
        var lines = sdp.split('\r\n'),
            i,
            parts,
            type,
            addresses = [],
            address,
            len = lines.length;

        // c.f. http://tools.ietf.org/html/rfc4566#page-39
        for (i = 0; i < len; i++) {
            // http://tools.ietf.org/html/rfc4566#section-5.13
            if (lines[i].indexOf("a=candidate") >= 0) {
                // http://tools.ietf.org/html/rfc5245#section-15.1
                parts = lines[i].split(' ');
                address = parts[4];
                type = parts[7];
                if (type === 'host') {
                    addresses.push(address);
                }
            } else {
                // http://tools.ietf.org/html/rfc4566#section-5.7
                if (lines[i].indexOf("c=") >= 0) {
                    parts = lines[i].split(' ');
                    address = parts[2];
                    addresses.push(address);
                }
            }
        }

        return addresses;
    },
    webRTCDetectIP = function (success, error) {
        // window.RTCPeerConnection is "not a constructor" in FF22/23
        var isFF = !!window.mozRTCPeerConnection,
            rtc,
            activeCallback = 2,
            addresses = [],
            blackList = ["0.0.0.0"],
            RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection,
            updateAddresses = function (addrs) {
                var i,
                    len = addrs.length;

                for (i = 0; i < len; i++) {
                    if (addresses.indexOf(addrs[i]) < 0 && blackList.indexOf(addrs[i]) < 0) {
                        addresses.push(addrs[i]);
                    }
                }

                activeCallback--;

                if (!activeCallback && typeof success === "function") {
                    success(addresses[0]);
                }
            };

        if (RTCPeerConnection) {
            rtc = new RTCPeerConnection({
                iceServers: []
            });

            // FF needs a channel/stream to proceed
            if (isFF) {
                rtc.createDataChannel('', {
                    reliable: false
                });
            }

            rtc.onicecandidate = function (evt) {
                if (evt.candidate) {
                    updateAddresses(grepSDP(evt.candidate.candidate));
                }
            };
            rtc.createOffer(function (offerDesc) {
                updateAddresses(grepSDP(offerDesc.sdp));
                rtc.setLocalDescription(offerDesc);
            }, error);
        }
    };

var network = {
    getIP: function (success, error) {
        webRTCDetectIP(success, error);
    }
};
var support = {
    svg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect
};
var userAgent = {
    language: (navigator && (navigator.systemLanguage || navigator.language.split('-')[0])).toLowerCase() || "",
    browser: browser,
    os: os,
    network: network,
    support: support,
    getKey: getKey,
    collect: collect
};
if (typeof define === 'function' && define.amd) {define('userAgent', [], function(){return userAgent;});}this.userAgent = userAgent;
}(window, document, navigator));