var userAgent = {
    language: (navigator && (navigator.systemLanguage || navigator.language.split('-')[0])).toLowerCase() || "",
    browser: browser,
    os: os,
    network: network,
    support: support,
    getKey: getKey,
    collect: collect
};