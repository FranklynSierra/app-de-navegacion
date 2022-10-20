import EventEmitter from 'eventemitter3'

export const emitter = new EventEmitter()

export const emittedRoute = (route) => emitter.emit('route', route)
