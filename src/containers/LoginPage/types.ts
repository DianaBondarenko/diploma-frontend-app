export interface LoginState {
  error: string | null;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}
