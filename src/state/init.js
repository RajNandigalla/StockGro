const { dispatch } = window.__store__;
const payload = JSON.parse(window.localStorage.getItem('data')) || [];
dispatch({ action: 'INIT', payload });
