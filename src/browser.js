var version = (
        (/(?:msie\s([0-9a-z,.]+);)/).exec(ua) || // msie
        (/(?:version\/([0-9a-z,.]+))$/).exec(ua) || //opera
        (/(?:chrome\/([0-9a-z,.]+)\s)/).exec(ua) || //chrome
        (/(?:firefox\/([0-9a-z,.]+))$/).exec(ua) || //firefox
        (/(?:version\/([0-9a-z,.]+)\s)/).exec(ua) || //safari
        []
    )[1] || null,
    browser = {
        version: version,

        isIPhone: (/iphone/i).test(ua),

        isIPad: (/ipad/i).test(ua),

        isIPod: (/ipod/i).test(ua),

        isIPadWebView: (/applewebkit/i).test(ua) && (/mobile/i).test(ua),

        isAndroidDevice: (/android/i).test(ua),

        isWindowsMobileDevice: (/windows\s+phone/i).test(ua),

        isOpera: (/'opera'/i).test(ua),

        isChrome: (/chrome/i).test(ua),

        isFireFox: (/firefox/).test(ua),

        isIE: (/msie/).test(ua),

        isSafari: (/safari/).test(ua)
    };

browser.isIOSDevice = browser.isIPad || browser.isIPod || browser.isIPhone || browser.isIPadWebView;
browser.isMobileDevice = browser.isIOSDevice || browser.isAndroidDevice || browser.isWindowsMobileDevice;