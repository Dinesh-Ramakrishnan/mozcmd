// GCLI Browser Scratchpad
// via https://bugzilla.mozilla.org/show_bug.cgi?id=724055#c7

// gBrowser.ownerDocument.defaultView.Scratchpad.openScratchpad()

Cu.import("resource:///modules/devtools/gcli.jsm");
gcli.addCommand({
  name: "scratchpad",
  description: "Commands to open a Scratchpad"
});

gcli.addCommand({
  name: "scratchpad new",
  description: "Open a new (empty) Scratchpad",
  exec: function(args, context) {
    let chromeWin = context.environment.chromeDocument.defaultView;
    chromeWin.Scratchpad.openScratchpad();
  }
});

gcli.addCommand({
  name: "scratchpad file",
  description: "Open a Scratchpad from a file",
  params: [
    {
      name: "filename",
      type: "string",
      description: "filename of scratchpad file to open",
      defaultValue: ""
    }
  ],
  exec: function(args, context) {
    let chromeWin = context.environment.chromeDocument.defaultView;
    let console = context.environment.contentDocument.defaultView.console;
    let spw = chromeWin.Scratchpad.openScratchpad();
    spw.addEventListener("load", function sploaded() {
      spw.removeEventListener("load", sploaded, false);
      if (args.filename) {
        let file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
        file.initWithPath(args.filename);
        spw.window.Scratchpad.importFromFile(file);
      } else {
        // XXX fix this!
        spw.setTimeout(200, spw.window.Scratchpad.openFile);
      }
    }, false);
  }
});

/* XXX TBD

    {
      name: "url",
      type: "string",
      description: "url of scratchpad file to open"
    },
    {
      name: "gist",
      type: "string",
      description: "gist url of scratchpad file to open"
    },
    {
      name: "pastebin",
      type: "string",
      description: "pastebin url of scratchpad file to open"
    }
  ],
  returnType: "null",
  exec: function Command_scratchpad(args, context) {
    let chromeWin = context.environment.chromeDocument.defaultView;
    let console = context.environment.contentDocument.defaultView.console;
    console.log("args: " + args.names.join(', '));

    chromeWin.Scratchpad.openScratchpad();
  }
});

*/