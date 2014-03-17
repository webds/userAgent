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