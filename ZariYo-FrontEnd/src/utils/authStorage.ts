/**
 * ZariYo Auth Storage Utility
 * Manages authentication tokens with sessionStorage for enhanced security (browser close auto-purge)
 * and optional localStorage when "Remember Me" is enabled.
 */

const TOKEN_KEY = 'zariyo_token';
const REFRESH_TOKEN_KEY = 'zariyo_refresh_token';
const USER_KEY = 'zariyo_user';

export const authStorage = {
  /**
   * Retrieves the Access Token from sessionStorage (preferred) or localStorage.
   */
  getAccessToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Retrieves the Refresh Token from sessionStorage (preferred) or localStorage.
   */
  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY) || localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Retrieves the Auth User object from sessionStorage or localStorage.
   */
  getUser<T = any>(): T | null {
    const userStr = sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Saves the authentication session.
   * If rememberMe is true: stores in localStorage for persistence.
   * If rememberMe is false (default): stores in sessionStorage for security (auto-purged on tab/browser close).
   */
  setSession(accessToken: string, refreshToken?: string | null, user?: any, rememberMe = false): void {
    // Clear both storages first to prevent stale credentials
    this.clearSession();

    const targetStorage = rememberMe ? localStorage : sessionStorage;

    if (accessToken) {
      targetStorage.setItem(TOKEN_KEY, accessToken);
    }
    if (refreshToken) {
      targetStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    if (user) {
      targetStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  /**
   * Clears all authentication tokens from both sessionStorage and localStorage.
   */
  clearSession(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};
