var grepSDP = function (sdp) {
        var hosts = [];
        sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
            if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                    addr = parts[4],
                    type = parts[7];
                if (type === 'host') {
                    updateDisplay(addr);
                }
            } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                var parts = line.split(' '),
                    addr = parts[2];
                updateDisplay(addr);
            }
        });
    },
    webRTCDetectIP = function (success, error) {
        // window.RTCPeerConnection is "not a constructor" in FF22/23
        var isFF = !!window.mozRTCPeerConnection,
            RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

        if (RTCPeerConnection) {
            var rtc = new RTCPeerConnection({
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
                    grepSDP(evt.candidate.candidate);
                }
            };
            rtc.createOffer(function (offerDesc) {
                grepSDP(offerDesc.sdp);
                rtc.setLocalDescription(offerDesc);
            }, function (e) {

            });

            var addrs = Object.create(null);
            addrs["0.0.0.0"] = false;
            function updateDisplay(newAddr) {
                if (newAddr in addrs) {
                    return;
                } else {
                    addrs[newAddr] = true;
                }
                var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
                document.getElementById('list').textContent = displayAddrs.join(" or perhaps ") || "n/a";
            }
        }
    };

var network = {
    getIP: function (success, error) {

    }
};