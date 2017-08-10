var app =
    {
        Models : {},
        Views  : {}
    };

$( document ).ready( function()
{
    var appModel = new app.Models.MapData();

    var mainView = new app.Views.Main( { model : appModel } );

    mainView.render();

} );