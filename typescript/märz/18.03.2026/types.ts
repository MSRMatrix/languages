export interface Password {
  id: string,
  name: string,
  value: string;
  options: PasswordOptions;
}

export interface PasswordOptions {
  uppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
}