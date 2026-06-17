let _token: string | null = null;

export const getAccessToken = (): string | null => _token;
export const setAccessToken = (token: string | null): void => { _token = token; };
