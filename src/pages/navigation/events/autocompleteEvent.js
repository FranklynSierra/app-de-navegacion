import EventEmitter from "eventemitter3";

export const emitter = new EventEmitter();

export const emittedAutocomplete = ({ place, mode, extraData }) =>
  emitter.emit("autocomplete", { place, mode, extraData });
