var fs = require('fs');
var path = require('path');
var currentpath = '/home/willvegapunk/Programming/LinuxConcepts';
var current_path_arr = currentpath.split('/');
var show_folder_list = (current_path_arr.slice(1,current_path_arr.length));
//var subfolders = new Array();


var root_obj = {
    root:'Programming',
    path:'/home/willvegapunk/Programming',
    subfolder:[]
};

function visit_dir(obj){
    let dir = obj['path'];
    let current_folder = obj['root'];
    if(show_folder_list.indexOf(current_folder)==-1){
        return ;
    }

    let files = fs.readdirSync(dir)//,function (err,files) {
        let subfolders=[]
     //   if(!err){
            files.forEach(function (file,index) {
                file_full_path = path.join(dir,file);
                if(fs.lstatSync(file_full_path).isDirectory()) {
                    subfolders.push({root:file,path:file_full_path,subfolder:[]});
                }
            });
    //    }
        obj.subfolder = subfolders;
        //console.log(obj);
        obj.subfolder.forEach(visit_dir);


    //})
}

visit_dir(root_obj);
for (var index = 0 ; index < root_obj.subfolder.length ; index++){
        console.log(root_obj.subfolder[index]);
}

