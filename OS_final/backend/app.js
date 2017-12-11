/**
 * Created by user on 2017/12/8.
 */
var express = require('express');
var fs = require('fs');
var path = require('path');

var current_path;
var current_path_arr;
var show_folder_list;
//var subfolders = new Array();




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





var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/api/visit_dir',function (req,res) {
    // console.log(req);
    current_path = req.param('path');
    current_path_arr = current_path.split('/');
    show_folder_list = (current_path_arr.slice(1,current_path_arr.length));

    let root_obj = {
        root:current_path_arr[1],
        path:current_path,
        subfolder:[]
    };

    visit_dir(root_obj);

    res.send(root_obj)

});

app.get('/api/userInput',function (req,res) {
    fs.readdir(req.query.path, function(err, items) {
        console.log(items);
        let list = [];
        for (var i = 0; i < items.length; ++i) {
            var dict = {};
            dict.filename = items[i];
            list.push(dict)
        }

        res.send(list)
    })
});

app.get('/api/root',function (req,res) {
    // console.log(req);


    fs.readdir('/home/willvegapunk/Programming/WebProgramming/OS_FinalProject/OS_final/backend', function(err, items) {
        console.log(items);
        let list = [];
        for (var i =0;i<items.length;++i){
            var dict = {};
            dict.filename = items[i];
            list.push(dict)
        }

        res.send(list)
    });
});





app.listen(3001, function () {
    console.log('Example app listening on port 3000!');
})
