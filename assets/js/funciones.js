 $(document).ready(function() {

    $("#Image").fileinput({
            overwriteInitial: true,
            maxFileSize: 2500,
            showClose: false,
            showCaption: false,
            browseLabel: '',
            removeLabel: '',
            browseIcon: '<img src="assets/images/folder.png" width=30 height=30>',
            removeIcon: '<img src="assets/images/delete.png" width=30 height=30>',
            removeTitle: 'Cancel or reset changes',
            elErrorContainer: '#kv-avatar-errors-1',
            msgErrorClass: 'alert alert-block alert-danger',
            defaultPreviewContent: '<img src="assets/images/photo_default.png" alt="Profile Image" style="width:100%;">',
            layoutTemplates: {
                main2: '{preview} {remove} {browse}'
            },
            allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
        });

});