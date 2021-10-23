import React from 'react'
var fs = require('fs');
var upload;

export function handleSearch(event)
{
    console.log("===");
    
    upload = event.target.files[0];
    console.log(upload);

    console.log("reading image");

    var file = new Blob([upload], {type: upload.type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, upload.name);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = upload.name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }

    // image location is now at chrome://settings/downloads/ upload.name
    // image name is upload.name

    // apply tensor here, reading from the downloads folder or something like that 
    
}