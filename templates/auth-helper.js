/**
 * auth-helper.js
 * Intercepts all fetch() calls and adds X-Auth-Token header from localStorage.
 * Include this in every page: <script src="/auth-helper.js"></script>
 */
(function() {
  const _fetch = window.fetch;
  window.fetch = function(url, opts = {}) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      opts.headers = opts.headers || {};
      // Handle both plain objects and Headers instances
      if (opts.headers instanceof Headers) {
        opts.headers.set('X-Auth-Token', token);
      } else {
        opts.headers['X-Auth-Token'] = token;
      }
    }
    return _fetch(url, opts);
  };

  // Also expose a helper to check if logged in
  window.getAuthToken = () => localStorage.getItem('auth_token');

  // Clear token on logout
  window.clearAuthToken = () => localStorage.removeItem('auth_token');
})();