Vue.component('tree', {
    template: '#tree-template',
    props: {
        model: Object
    },
    data: function () {
        return {
            open: false
        }
    },
    computed: {
        isFolder: function () {
            return this.model.subfolder&&
                this.model.subfolder.length
        },
    },
    methods: {
//            toggle: function () {
//                if (this.isFolder) {
//                    this.open = !this.open
//                }
//            },
        goDirectory: function(path){
            console.log("Execute goDirectory");
            console.log(this);
            bus.$emit('gettree_c',path);
        },
    }
});