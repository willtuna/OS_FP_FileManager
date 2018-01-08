var express = require('express');
var fs = require('fs');
var path = require('path');
var current_path;
var current_path_arr;
var show_folder_list;
const {execFile} = require('child_process');
var exec = require('child_process').exec;


function visit_dir(obj) {
    let dir = obj['path'];
    let current_folder = obj['root'];
    if (show_folder_list.indexOf(current_folder) == -1) {
        return;
    }

    let files = fs.readdirSync(dir)
    let subfolders = []

    files.forEach(function (file, index) {
        file_full_path = path.join(dir, file);
        if (fs.lstatSync(file_full_path).isDirectory()) {
            let subfolder = {root: file, path: file_full_path, subfolder: []};
            if (show_folder_list.indexOf(file) != -1) {
                subfolders.unshift(subfolder);
            }
            else {
                subfolders.push(subfolder);
            }
        }
    });

    obj.subfolder = subfolders;

    obj.subfolder.forEach(visit_dir);

}

module.exports = (function () {
    'use strict';
    var router = express.Router();
    router.get('/api/visit_dir', function (req, res) {
        // console.log(req);
        current_path = req.param('path');
        current_path_arr = current_path.split('/');
        show_folder_list = (current_path_arr.slice(1, current_path_arr.length));

        let root_obj = {
            root: current_path_arr[1],
            path: '/' + current_path_arr[1],
            subfolder: []
        };

        visit_dir(root_obj);

        res.send(root_obj)

    });

    router.get('/api/userInput', function (req, res) {
        fs.readdir(req.query.path, function (err, items) {
            // console.log(items);
            let list = [];
            for (var i = 0; i < items.length; ++i) {
                var dict = {};
                dict.filename = items[i];
                list.push(dict)
            }
            res.send(list)
        })
    });

    router.get('/api/root', function (req, res) {
        // console.log(req);
        fs.readdir('/home/jimmy/OS_FP_FileManager/OS_final/', function (err, items) {
            // console.log(items);
            let list = [];
            for (var i = 0; i < items.length; ++i) {
                var dict = {};
                dict.filename = items[i];
                list.push(dict)
            }

            res.send(list)
        });
    });
    router.post('/api/encrypt', (req, res) => {
        console.log('encrypt:', req.body)
        var targetFilePath = req.body.filename
        var password = req.body.password
        exec('7z a ' + targetFilePath + '.7z' + ' ' + targetFilePath + ' -p' + password, (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log(stdout);
            res.sendStatus(200);
        });
        console.log('encrypt')
    });
    router.post('/api/decrypt', (req, res) => {
        console.log('decrypt:', req.body)
        var targetFilePath = req.body.filename
        var password = req.body.password
        const child_decrypt = exec('yes | 7z x ' + targetFilePath + ' -p' + password, (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log(stdout);
            res.sendStatus(200);
        });
    });
    router.post('/api/deleteFile', (req, res) => {
        console.log('deleteFile:', req.body)
        var targetFilePath = req.body.filename
        const child_deleteFile = execFile('python', ['operation/delete_file.py', targetFilePath], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log(stdout);
            res.sendStatus(200);
        });
    });
    router.post('/api/deleteDir', (req, res) => {
        console.log('deleteDir:', req.body)
        var targetDirPath = req.body.filename
        const child_deleteDir = execFile('python', ['operation/delete_directory.py', targetDirPath], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log(stdout);
            res.sendStatus(200);
        });
    });

    router.post('/api/createFile', (req, res) => {
        console.log('createFile:', req.body)
        var  targetFilePath = req.body.filename
        const child_createFile = execFile('go', ['run','operation/CreateFile.go',targetFilePath], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log(stdout);
            res.sendStatus(200);
        });
    });

    router.post('/api/createDir', (req, res) => {
        console.log('createFile:', req.body)
        var  targetDirPath = req.body.filename
        const child_createDir = execFile('go', ['run','operation/CreateDir.go', targetDirPath], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log(stdout);
            res.sendStatus(200);
        });
    });

    router.post('/api/getFileInfo', (req, res) => {
        console.log('getFileInfo:', req.body)
        var  targetFilePath = req.body.filename;
        const child_get_file_info = execFile('python', ['operation/get_file_info.py', targetFilePath], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            //console.log((stdout))
            /*
            { fileName: 'TESTDIR',
              fileType: 'undefine',
              path: '/home/jimmy/OS_FP_FileManager/OS_final/backend/operation/TESTDIR',
              size: '0',
              lastModifiedTime: 'Tue Jan  9 07:03:47 2018',
              lastCreatedTime: 'Tue Jan  9 07:03:47 2018' }
             */
            var json_obj = JSON.parse(stdout);
            res.json(json_obj);
            res.sendStatus(200);
        });

    });

    return router;
})();

