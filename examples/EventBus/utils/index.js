function verifyMaxListeners (type) {
  if (type.length >= this._maxListeners) {
    throw new Error(`${type}'s listeners has exceeded the MaxListeners size`);
  }
  return true;
}

export {
  verifyMaxListeners
}