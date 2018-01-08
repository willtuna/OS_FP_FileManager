Vue.component('v-table', {
    template: '#table',
    props: {
        filelist:''
    },
    methods:{
        fileIcon:function (index) {
            if(this.filelist[index].filename[0]=='.'){
                return 'glyphicon-folder-open'
            }

            let filetype = this.filelist[index].filename.split('.')
            if(filetype.length==1){
                return 'glyphicon-folder-open'
            }
            console.log(filetype)
            let bootstrap_class = {
                image:'glyphicon-picture',
                dir:'glyphicon-folder-open',
                file:'glyphicon-file'
            }
            let gly_class = 'glyphicon-picture'
            switch (filetype[1]){
                case 'jpg':
                    gly_class = bootstrap_class.image
                    break
                case 'js':
                    gly_class = bootstrap_class.file
                    break
                default:
                    gly_class = bootstrap_class.dir
            }
            return gly_class
        }

    }
})