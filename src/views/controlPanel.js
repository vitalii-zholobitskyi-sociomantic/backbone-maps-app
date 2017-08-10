app.Views.ControlPanel = Backbone.View.extend( {
    events :
    {
        'click #show-map' : 'submitLocation',
        'change input'    : 'inputChanged'
    },

    template : '#control-panel-template',

    submitLocation : function( e )
    {
        e.preventDefault();
        if ( this.validateInput( this.$( '#latitude' ).val() )
            && this.validateInput( this.$( '#longitude' ).val() ) )
        {
            this.model.set(
                {
                    'latitude'  : this.$( '#latitude' ).val(),
                    'longitude' : this.$( '#longitude' ).val()
                } );
        }
        else
        {
            this.model.set(
                {
                    'latitude'  : null,
                    'longitude' : null
                } );
        }
        this.trigger( 'input:submitted' );
    },

    validateInput : function( value )
    {
        return NUMERIC_REGEXP.test( value );
    },

    inputChanged : function( e )
    {
        if ( !this.validateInput( e.target.value ) )
        {
            $( e.target ).parent().addClass( 'invalid-input' );
        }
        else
        {
            $( e.target ).parent().removeClass( 'invalid-input' );
        }
        this.trigger( 'input:changed' );
    },

    serializeData : function()
    {
        return this.model.toJSON();
    },

    render : function()
    {
        var data = this.serializeData();
        var html = _.template( $( this.template ).html() ).call( this, data );

        this.$el.html( html );

        return this;
    }
} );