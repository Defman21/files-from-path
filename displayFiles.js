function displayFiles() {
    /*Create components*/
    var os = Components.classes["@activestate.com/koOs;1"].getService(Components.interfaces.koIOs);
    var osp = Components.classes["@activestate.com/koOsPath;1"].getService(Components.interfaces.koIOsPath);
    var kodoc = komodo.koDoc;
    var scimoz = ko.views.manager.currentView.scimoz;
    var pos = scimoz.anchor;
    var line = scimoz.lineFromPosition(pos);
    var dirname = kodoc.file.dirName;
    var string = scimoz.getTextRange(scimoz.getLineEndPosition(line)-scimoz.lineLength(line), scimoz.getLineEndPosition(line));
    var matches = string.match(/(?:\'|\")([^\'\"]+)(?:\'|\")/g);
    function recursive_display_files(path) {
        var returned_array = [];
        if(!osp.exists(path)) return false; /*if path not exists*/
        if(!osp.isdir(path)) return false; /*if path not folder (e.g. /var/www/style.css - not folder :) ) */
        var list = os.listdir(path, {});
        for (k in list) {
            var file = list[k];
            var abs = osp.realpath(osp.join(path, file));
            if(osp.isdir(abs)) {
                returned_array[k] = file+"/";
            } else {
                returned_array[k] = file;
            }
        }
        return returned_array;
    }
    for(i in matches) {
        var match = matches[i].replace(/(\"|\')/g, ""); //replace " and ' in matches
        if(match.indexOf(".") !== -1) {
            var path = osp.join(dirname, match);
        } else if(match !== "/") { //if path equal root directory of current file directory: set path to current directory of curent file 
            match = match.substr(1);  //else remove first "/"
            var path = osp.join(dirname, match);
        } else {
            var path = dirname;
        }
        var array = recursive_display_files(path); //generate array of files
        if(array !== false && typeof(array[0]) !== "undefined") {
            var scimoz = ko.views.manager.currentView.scimoz;
            var sep = String.fromCharCode(scimoz.autoCSeparator);
            scimoz.autoCShow(0, array.join(sep));
        }
    }
}
displayFiles();
