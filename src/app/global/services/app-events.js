import Emitter from "emitter-js";

export class Events {
  /**
   * Set an event handler for an event.
   * @param {string} event name of the event
   * @param {function} func event handler.
   */
  static subscribe(event, func) {
    return Events.topic.on(event, func);
  }

  /**
   * Push an asynchronous message.
   * @param {string} event name of the event
   * @param {object} data data to send.
   *
   * */
  static publish(event, data) {
    return Events.topic.emit(event, data);
  }
}

Events.topic = new Emitter();
