var _ = require( 'underscore' );

var slice = Array.prototype.slice;

exports.Model = {
    pick    : function(){ return _.pick( this, slice.call( arguments ) ); },

    escape : function( attr ){
        return _.escape( this[ attr ] );
    },

    matches : function( attrs ){
        return !!_.iteratee( attrs, this )( this );
    }
};

addUnderscoreMethods( exports.Model, '_clonedProps', {
    keys: 1, values: 1, pairs: 1, invert: 1,
    omit: 0, chain: 1, isEmpty: 1
});

( exports.Model, [ 'keys', 'values', 'pairs', 'invert', 'chain', 'isEmpty' ] );

exports.Collection = {};

addUnderscoreMethods( exports.Collection, 'models', {
    forEach  : 3, each : 3, map : 3, collect : 3, reduce : 4,
    foldl    : 4, inject : 4, reduceRight : 4, foldr : 4, find : 3, findIndex : 3, findLastIndex : 3, detect : 3, filter : 3,
    select   : 3, reject : 3, every : 3, all : 3, some : 3, any : 3, include : 3, includes : 3,
    contains : 3, invoke : 0, max : 3, min : 3, toArray : 1, size : 1, first : 3,
    head     : 3, take : 3, initial : 3, rest : 3, tail : 3, drop : 3, last : 3,
    without  : 0, difference : 0, indexOf : 3, shuffle : 1, lastIndexOf : 3,
    isEmpty  : 1, chain : 1, sample : 3, partition : 3, groupBy : 3, countBy : 3,
    sortBy   : 3, indexBy : 3
});


function addUnderscoreMethods(Mixin, attribute, methods ) {
    _.each(methods, function(length, method) {
        if (_[method]) Mixin[method] = addMethod(length, method, attribute);
    });
}

// Proxy Backbone class methods to Underscore functions, wrapping the model's
// `attributes` object or collection's `models` array behind the scenes.
//
// collection.filter(function(model) { return model.get('age') > 10 });
// collection.each(this.addView);
//
// `Function#apply` can be slow so we use the method's arg count, if we know it.
function addMethod(length, method, attribute) {
    switch (length) {
        case 1: return function() {
            return _[method](this[attribute]);
        };
        case 2: return function(value) {
            return _[method](this[attribute], value);
        };
        case 3: return function(iteratee, context) {
            var value = this[ attribute ],
                callback = cb(iteratee, this);

            return arguments.length > 1 ?
                   _[method]( value, callback, context)
                : _[method]( value, callback );
        };
        case 4: return function(iteratee, defaultVal, context) {
            var value = this[ attribute ],
                callback = cb(iteratee, this);

            return arguments.length > 1 ?
                   _[method]( value, callback, defaultVal, context )
                : _[method](value, callback );
        };
        default: return function() {
            var args = slice.call(arguments);
            args.unshift(this[attribute]);
            return _[method].apply(_, args);
        };
    }
}

// Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
function cb(iteratee, instance) {
    if (_.isFunction(iteratee)) return iteratee;
    if (_.isObject(iteratee) && !(iteratee instanceof instance.model )) return _.matches(iteratee);
    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
    return iteratee;
}
