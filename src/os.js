var os = {
    name: "",
    isUnix: (/unix/i).test(ua),
    isLinux: (/linux/i).test(ua),
    isIrix: (/irix/i).test(ua),
    isMac: (/mac/i).test(ua),
    isSun: (/sun/i).test(ua),
    isFreeBSD: (/freebsd/i).test(ua),
    isWindows: (/win/i).test(ua),
    isTouch: (/touch/i).test(ua)
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
    } else if (/windows\s+nt\s+6\.1/i.test(ua)) {
        os.name = "Windows 7";
    } else if (/windows\s+nt\s+6\.2/i.test(ua)) {
        os.name = "Windows 8";
    } else if (/windows\s+nt\s+6\.0/i.test(ua)) {
        os.name = "Windows Vista";
    } else if (/Windows/.test(ua)) {
        os.name = "Windows XP";
    } else {
        os.name = "Windows 3.1";
    }
}