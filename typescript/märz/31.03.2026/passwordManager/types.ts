export interface Password {
  id: string,
  name: string,
  value: string;
  strengh: string;
  iv: string,
  options: PasswordOptions;
}

export interface PasswordOptions {
  uppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
}

export type Storage = {
  masterPassword: string | null;
  passwords: Password[];
};