const { execFile } = require('child_process');
var exec = require('child_process').exec;

var targetFilePath = '/home/jimmy/OS_FP_FileManager/OS_final/backend/operation/TESTDIR';
var targetDirPath;
var srcFilePath;
var srcDirPath;
var password = '1111';
/*
const child_createFile = execFile('go', ['run','operation/CreateFile.go',targetFilePath], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});
const child_createDir = execFile('go', ['run','operation/CreateDir.go', targetDirPath], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});

const child_encrypt = exec('7z a ' + targetFilePath+'.7z' + ' '+targetFilePath +' -p'+password , (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});
const child_decrypt = exec('yes | 7z x '+ targetFilePath +' -p'+password, (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});
const child_deleteFile = execFile('python', ['operation/delete_file.py', targetFilePath], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});
const child_deleteDir = execFile('python', ['operation/delete_directory.py', targetDirPath], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
});*/
const child_get_file_info = execFile('python', ['operation/get_file_info.py', targetFilePath], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log((stdout))
    var json =JSON.parse( stdout);
    console.log(json)
});
