app.Views.Main = Backbone.View.extend( {
    el : '#contents',

    template : '#app-template',

    initialize : function()
    {
        this.subViews = {};

        this.subViews.controlPanel = new app.Views.ControlPanel(
            {
                model : this.model
            } );

        this.subViews.map = new app.Views.Map(
            {
                model : this.model
            } );

        this.subViews.streetView = new app.Views.StreetImages(
            {
                model : this.model
            } );

        this.listenTo( this.subViews.controlPanel,
            'input:submitted',
            function()
            {
                this.displayMap();
                this.clearViewStreet();
            } );

        this.listenTo( this.subViews.map,
            'map:clicked',
            this.displayStreetView );
    },

    onRender : function()
    {
        this.$( '#app' ).prepend(
            this.subViews.controlPanel.render().el,
            this.subViews.map.render().el,
            this.subViews.streetView.render().el
        );

        this.subViews.streetView.setVisible( false );
    },

    displayMap : function()
    {
        this.subViews.map.loadMap();
    },

    clearViewStreet : function()
    {
        this.subViews.streetView.clear();
    },

    displayStreetView : function( map, position )
    {
        this.subViews.streetView.setVisible( true );
        this.subViews.streetView.load( map, position );
    },

     render : function()
     {
        var html = _.template( $( this.template ).html() );

        this.$el.html( html );

        if ( typeof this.onRender === 'function' )
        {
            this.onRender();
        }

        return this;
    }
} );