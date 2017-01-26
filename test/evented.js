'use strict';
const assert = require('assert');

describe('Evented is a module that', function () {
    const evented = require('../evented');
    describe("can", function () {
        describe('create a new evented object', function () {
            it('from no parameter', function () {
                const e = evented();
                assert_is_event_emitter(e);
            });
        });
        describe('add events to existing object', function () {
            it('accepts object parameter', function () {
                const parent = {some_property: 'aaa'};
                const e = evented(parent);
                assert_is_event_emitter(e);
                assert.equal('aaa', e.some_property);
            });
            it('keeps nested properties', function () {
                const parent = {
                    property: {
                        nested_property: 'right value'
                    }
                };
                const e = evented(parent);
                assert.equal('right value', e.property.nested_property);
            });
            it("keeps parent functions", function () {
                const parent = {some_function: (param) => {return param;}};
                const e = evented(parent);
                assert_is_event_emitter(e);
                assert.equal('result', e.some_function('result'));
            });
            describe("if existing object has a prototype", function () {
                class MyClass {
                    func (param) {
                        return param;
                    }
                }
                const parent = new MyClass();
                it.skip("does not keep parent prototype functions", function () {
                    const e = evented(parent);
                    assert_is_event_emitter(e);
                    assert.equal('result', e.func('result'));
                });
            });
        });

    });

    describe("behaves as an event emitter", function () {
        const e = evented();
        it('can emit and receive events', function () {
            const p = new Promise((resolve) => {
                e.on('event_name', () => resolve(true));
            });
            e.emit('event_name');
            return p;
        });
        it('event can pass custom information', function () {
            setTimeout(() => {
                e.emit('event_name', {extra: 'extra'});
            }, 1);
            return new Promise((resolve) => {
                e.on('event_name', (p) => {
                    assert.equal('extra', p.extra);
                    resolve(true);
                });
            });
        });
        it("has once", function (done) {
            setTimeout(() => {
                e.emit('event_name', {extra: 'extra'});
                e.emit('event_name', {extra: 'extra'});
            }, 1);

            e.once('event_name', (param) => {
                assert.equal('extra', param.extra);
                done();
            });

        });
        it("can disable observers", function () {
            
        });
    });


    function assert_is_event_emitter(e) {
        assert(e);
        assert.equal('function', (typeof e.on));
    }
});

describe('Event-Emitter is a module that', function () {
    const evented = require('event-emitter');
    describe("can", function () {
        describe('create a new evented object', function () {
            it('from no parameter', function () {
                const e = evented();
                assert_is_event_emitter(e);
            });

        });
        describe('add events to existing object', function () {
            it('accepts object parameter', function () {
                const parent = {some_property: 'aaa'};
                const e = evented(parent);
                assert_is_event_emitter(e);
                assert.equal('aaa', e.some_property);
            });
            it('keeps nested properties', function () {
                const parent = {
                    property: {
                        nested_property: 'right value'
                    }
                };
                const e = evented(parent);
                assert.equal('right value', e.property.nested_property);
            });
            it("keeps parent functions", function () {
                const parent = {some_function: (param) => {return param;}};
                const e = evented(parent);
                assert_is_event_emitter(e);
                assert.equal('result', e.some_function('result'));
            });
            describe("if existing object has a prototype", function () {
                class MyClass {
                    func (param) {
                        return param;
                    }
                }
                const parent = new MyClass();
                it("keeps parent prototype functions", function () {
                    const e = evented(parent);
                    assert_is_event_emitter(e);
                    assert.equal('result', e.func('result'));
                });
            });
        });

    });

    describe("behaves as an event emitter", function () {
        const e = evented();
        it('can emit and receive events', function () {
            const p = new Promise((resolve) => {
                e.on('event_name', () => resolve(true));
            });
            e.emit('event_name');
            return p;
        });
        it('event can pass custom information', function () {
            setTimeout(() => {
                e.emit('event_name', {extra: 'extra'});
            }, 1);
            return new Promise((resolve) => {
                e.on('event_name', (p) => {
                    assert.equal('extra', p.extra);
                    resolve(true);
                });
            });
        });
        it("has once", function () {

        });
        it("can disable observers", function () {

        });
    });


    function assert_is_event_emitter(e) {
        assert(e);
        assert.equal('function', (typeof e.on));
    }
});
