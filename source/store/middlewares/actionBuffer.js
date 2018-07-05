// Module that buffers actions dispatched until a passed set of actions
// have occured and then flushs the buffer in same order as when dispatched
// earlier.
const buffer = [];

let actionsToIgnore;
let shouldBuffer;
let flushAfterActionTypes;
export const absorbActionsToBuffer = (
  ignoreActions = [],
  flushAfterActions = []
) => {
  shouldBuffer = true;
  actionsToIgnore = ignoreActions;
  flushAfterActionTypes = flushAfterActions;
};

export const actionBuffer = store => next => action => {
  if (flushAfterActionTypes.indexOf(action.type) !== -1) {
    flushAfterActionTypes = flushAfterActionTypes.filter(
      type => type !== action.type
    );
  }

  if (!flushAfterActionTypes.length) {
    shouldBuffer = false;
    actionsToIgnore = [];
    while (buffer.length) {
      const bufferedActionToDispatch = buffer.pop();
      store.dispatch(bufferedActionToDispatch);
    }
  }

  if (shouldBuffer && actionsToIgnore.indexOf(action.type) === -1) {
    buffer.push(action);
  } else {
    next(action);
  }
};
