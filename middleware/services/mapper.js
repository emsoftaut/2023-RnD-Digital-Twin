function deepMapping(source, target, ignoredParam = null) {
  Object.keys(source).forEach((key) => {
        if (key === ignoredParam || typeof source[key] == 'function') {
            return;
        }

        if (typeof source[key] === 'object' && source[key] !== null) {
          if (!target[key]) {
            target[key] = {};
          }
          deepMapping(source[key], target[key], ignoredParam);
        } else {
          target[key] = source[key];
        }
    });
}

module.exports = deepMapping;