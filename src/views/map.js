app.Views.Map = Backbone.View.extend( {
    loadMap : function()
    {
        var self = this;

        if ( !( this.model.get( 'latitude' )
            && this.model.get( 'longitude' ) ) )
        {
            this.hideMap();
            return;
        }

        var position =
            new google.maps.LatLng(
                this.model.get( 'latitude' ),
                this.model.get( 'longitude' ) );

        var mapOptions = {
            zoom      : 15,
            center    : position,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };

        var map =
            new google.maps.Map(
                document.getElementById( 'map-canvas' ),
                mapOptions );

        var marker = new google.maps.Marker(
            {
                position : mapOptions.center,
                label    : 'Click me!',
                map      : map
            } );


        google.maps.event.addListener( marker, 'click', function()
        {
            self.trigger( 'map:clicked', map, position );
        } );
    },

    template : '#map-template',

    serializeData : function()
    {
        return this.model.toJSON();
    },

    hideMap : function()
    {
        $( '#map-canvas' ).html( '' );
    },

    initialize : function()
    {
        _.bindAll( this, 'render' );
        this.model.bind( 'change', this.render );
    },

    render : function()
    {
        var html = _.template( $( this.template ).html() );

        this.$el.html( html );

        return this;
    }
} );