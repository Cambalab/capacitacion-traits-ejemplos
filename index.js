'use strict';

import { traits, excludes, alias, requires }  from 'traits-decorator'

class TFirst {

    @requires('collection:[]')
    first() {
        return this.collection[0];
    }

}

class TLast {

    @requires('collection:[]')
    last() {
        let collection = this.collection;
        let l = collection.length;
        return collection[l-1];
    }

    justAnother() {}

    foo() {
        console.log('from TLast\'s foo');
    }
}

//composing a Trait with others
@traits( TFirst, TLast::excludes('foo', 'justAnother') )
class TEnum {

    foo() {
        console.log('enum foo')
    }
}

//apply trait TEnum
@traits(TEnum::alias({ foo: 'enumFoo' }) )
class MyClass {

    constructor (collection = []) {
        this.collection = collection
    }
}

let obj = new MyClass([1,2,3]);

console.log(obj.first()); // 1

obj.enumFoo(); // enum foo