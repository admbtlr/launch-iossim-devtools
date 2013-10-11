var spawn = require('child_process').spawn;

var e = exports;

/**
 * (Taken from https://github.com/rauschma/jsreload)
 * @param callback Optional
 */
e.runAppleScript = function (script, callback) {
    var osa = spawn("osascript", ["-e", script]);
    var out = "";
    var err = "";
    osa.stdout.on('data', function (data) {
        out += data;
    });
    osa.stderr.on('data', function (data) {
        err += data;
    });
    osa.on('exit', function (code) {
        // Ignore stdout (which shows the return value of the AppleScript code)
        if (err.length > 0) {
            console.log("STDERR: "+err);
        }
        if (callback) {
            callback();
        }
    });
};

e.launchDevTools = e.runAppleScript.bind(null, '\
tell application "Safari" to activate\n\
tell application "System Events"\n\
    tell process "Safari"\n\
        click menu item "index.html" in menu "iPhone Simulator" of menu item "iPhone Simulator" in menu "Develop" of menu bar item "Develop" in menu bar 1\n\
    end tell\n\
end tell\n\
');