export interface Password {
  id: string,
  value: string;
  options: PasswordOptions;
}

export interface PasswordOptions {
  uppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
}