import { nextTick } from "process";

//@ts-nocheck
if (typeof localSetImmediate === 'function') {
   
    schedulePerformWorkUntilDeadline = function () {
        localSetImmediate(performWorkUntilDeadline);
    };
} else if (typeof MessageChannel !== 'undefined') {
   
    var channel = new MessageChannel();
    var port = channel.port2;
    channel.port1.onmessage = performWorkUntilDeadline;

    schedulePerformWorkUntilDeadline = function () {
        port.postMessage(null);
    };
} else {
    schedulePerformWorkUntilDeadline = function () {
        localSetTimeout(performWorkUntilDeadline, 0);
    };
}
