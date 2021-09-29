export const loadState = (state) => {
    try {
      const serializedState = localStorage.getItem(`${state}`);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      
      let stateKeys = Object.keys(state)
      stateKeys.forEach(k => {
        const serializedState = JSON.stringify(state[k +""]);
        localStorage.setItem(k, serializedState);
      })
      // localStorage.setItem('state', serializedState);
    } catch (err) {
      // Ignore write errors.
    }
  };