import EventEmitter from "eventemitter3";

export const emitter = new EventEmitter();

export const emittedAutocomplete = ({ place, mode}) =>
  emitter.emit("autocomplete", { place, mode});

export const emittedRoute = (route) => emitter.emit('route', route)

export const emittedDestinationSelected = (destine) => emitter.emit('destine-selected', destine)

