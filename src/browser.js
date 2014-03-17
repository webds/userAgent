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