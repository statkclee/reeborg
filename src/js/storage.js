/* Author: André Roberge
   License: MIT

   Utilities for dealing with html LocalStorage.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.storage = {};

RUR.storage.memorize_world = function () {
    var existing_names, i, key, response;
    existing_names = ' [';

    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            existing_names += key.substring(11) + ", ";
        }
    }
    existing_names += "]";
    response = prompt(RUR.translate("Enter world name to save") + existing_names);
    if (response !== null) {
        RUR.storage._save_world(response.trim());
        $('#delete-world').show();
    }
};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        // replace existing
        localStorage.setItem("user_world:"+ name, RUR.world.export_world(RUR.current_world));
    } else {
        RUR.storage.save_world(name);
    }
    RUR.world.saved_world = RUR.world.clone_world();
};

RUR.storage.save_world = function (name){
    "use strict";
    var url = "user_world:"+ name;
    localStorage.setItem(url, RUR.world.export_world(RUR.current_world));
    RUR.storage.append_world_name(name);
};

RUR.storage.append_world_name = function (name){
    "use strict";
    var url = "user_world:"+ name;
    RUR.world_select.append_world({url:url, shortname:name, local_storage:true});
    RUR.world_select.set_url(url);  // reload as updating select choices blanks the world.

    /* appends name to world selector and to list of possible worlds to delete */
    $('#delete-world h3').append('<button class="blue-gradient inline-block" onclick="RUR.storage.delete_world('
            + "'"+ name + "'" + ');$(this).remove()"">' + RUR.translate('Delete ') + name + '</button>');
    $('#delete-world').show();
}

RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();

    try {
        RUR.world_select.set_url(localStorage.getItem(RUR.settings.world));
    } catch (e) {
        RUR.world_select.set_default();
    }

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};


RUR.storage.remove_world = function () {
    var existing_names, i, key, response;
    existing_names = ' [';

    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            existing_names += key.substring(11) + ", ";
        }
    }
    existing_names += "]";
    response = prompt(RUR.translate("Enter world name to delete") + existing_names);
    if (response !== null) {
        RUR.storage.delete_world(response.trim());
    }
};