type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, boolean | undefined | null>
  | ClassValue[];

function toClassName(input: ClassValue): string[] {
  if (!input) {
    return [];
  }

  if (typeof input === 'string' || typeof input === 'number') {
    return [String(input)];
  }

  if (Array.isArray(input)) {
    return input.flatMap((value) => toClassName(value));
  }

  if (typeof input === 'object') {
    return Object.entries(input)
      .filter(([, enabled]) => Boolean(enabled))
      .map(([className]) => className);
  }

  return [];
}

export function cn(...inputs: ClassValue[]) {
  return inputs.flatMap((input) => toClassName(input)).join(' ');
}
