app.Views.StreetImages = Backbone.View.extend( {
    template : '#street-images-template',

    load : function( map, position )
    {
        var panoramaOptions =
            {
                position : position,
                pov      :
                {
                    heading : 0,
                    pitch   : 10
                },
                mode     : 'html5'
            };
        var webService = new google.maps.StreetViewService();

        webService.getPanoramaByLocation( position, 200, function( panoData )
        {
            if ( panoData && panoData.location && panoData.location.latLng )
                {
                    panoramaOptions.position = panoData.location.latLng;
                    var panorama =
                        new google.maps.StreetViewPanorama(
                            document.getElementById( 'street-view' ),
                            panoramaOptions );

                    map.setStreetView( panorama );
            }
            else
            {
                this.$( '#street-view' )
                    .html( 'Street View is not available for this location.' );
            }
        } );
    },

    isVisible : function()
    {
        return !this.$el.hasClass( 'invisible' );
    },


    setVisible : function( isVisible )
    {
        if ( isVisible )
        {
            this.$el.removeClass( 'invisible' );

        }
        else
        {
            this.$el.addClass( 'invisible' );
        }
    },

    clear : function()
    {
        this.$el.addClass( 'invisible' );

        this.$( '#street-view' ).html( '' );

        this.render();
    },

    render : function()
    {
        var html = _.template( $( this.template ).html() );

        this.$el.html( html );

        return this;
    }

} );