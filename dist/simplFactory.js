'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

var cjs = deepmerge_1;

/**
 * Test if a variable is a Function
 * @param entry
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function isFunction(entry) {
    return entry.constructor === Function;
}
/**
 * Test if a variable is an Object
 * @param entry
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function isObject(entry) {
    return entry.constructor === Object;
}
/**
 * Test if a variable is a String
 * @param entry
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function isString(entry) {
    return entry.constructor === String;
}

/**
 * Create and return a factory with traits and contextual data.
 * @param registry Registry of factories
 * @param factoryName Name of the factory
 * @param traits A list of traits to be resolved
 * @param context Contextual data to be merged within schema
 * @returns literal object with resolved traits and contextual data.
 */
function renderFactory(registry, factoryName, traits, context) {
    var _a = registry[factoryName](), factorySchema = _a.schema, _b = _a.traits, factoryTraits = _b === void 0 ? {} : _b;
    return __spreadArray(__spreadArray([
        factorySchema
    ], buildTraits(factoryTraits, traits)), [
        context
    ]).reduce(function (acc, schema) { return cjs(acc, schema); }, {});
}
/**
 * Resolve traits data for a given traits object.
 * @param factoryTraits Factory traits
 * @param traits Traits to resolve
 * @returns
 */
function buildTraits(factoryTraits, traits) {
    return traits.map(function (trait) { return factoryTraits[trait]; });
}
function processArgs(args) {
    var traits = [];
    var context = {};
    if (args.length) {
        var lastArg = args.slice().pop();
        // @ts-expect-error: at least one arg will be present
        var restArgs = args.slice(0, -1);
        // context can be either a Object or a Function
        if (isObject(lastArg) || isFunction(lastArg)) {
            // @ts-expect-error: Unreachable code error
            context = isFunction(lastArg) ? lastArg : __assign({}, lastArg);
            traits = __spreadArray([], restArgs);
        }
        if (isString(lastArg)) {
            // @ts-expect-error: at least one arg will be present
            traits = __spreadArray([], args);
        }
    }
    return { traits: traits, context: context };
}

/**
 * Registry of all factories
 */
var registry = {};
/**
 * Registers a new factory.
 */
function define(factoryName, factory) {
    if (!Object.prototype.hasOwnProperty.call(factory(), 'schema')) {
        throw new Error('A schema is required to define a factory.');
    }
    if (Object.prototype.hasOwnProperty.call(registry, factoryName)) {
        console.warn("Factory \"" + factoryName + "\" was redefined.");
    }
    registry[factoryName] = factory;
}
/**
 * Create a literal object derived from the given factory.
 * @param factoryName Factory name
 * @param args Arguments including traits and/or contextual data
 * @returns object with resolved factory
 */
function create(factoryName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var _a = processArgs(args), traits = _a.traits, context = _a.context;
    if (!registry[factoryName]) {
        throw new Error("Factory " + factoryName + " does not exists.");
    }
    return renderFactory(registry, factoryName, traits, context);
}
/**
 * Resolve and return a list of new instances of a factory.
 * @param factoryName Factory name
 * @param count Amount of instances to be generated
 * @param args Arguments including traits and/or contextual data
 * @returns
 */
function createList(factoryName, count) {
    if (count === void 0) { count = 10; }
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var _a = processArgs(args), traits = _a.traits, context = _a.context;
    var arrayWithIndexes = Array(count)
        .fill(0)
        .map(function (_, index) { return index; });
    return arrayWithIndexes.map(function (index) {
        return renderFactory(registry, factoryName, traits, 
        // @ts-expect-error: how to fix this?
        // Error:
        //    This expression is not callable.
        //    Not all constituents of type 'Context' are callable.
        //    Type 'FactorySchema' has no call signatures.ts(2349)
        isFunction(context) ? context(index) : context);
    });
}

exports.create = create;
exports.createList = createList;
exports.define = define;
