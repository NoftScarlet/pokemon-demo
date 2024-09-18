import axios from "axios";

export function handleNonNegativeInteger(number: number) {
  if (!Number.isInteger(number) || number < 0) {
    throw new Error('Index must be a non-negative integer');
  }
}

export function fetchErrorHandler(error: unknown): never {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw new Error(`Failed to fetch Pokemon data: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Failed to fetch Pokemon data: No response received from the server.');
    } else {
      throw new Error(`Failed to fetch Pokemon data: ${error.message}`);
    }
  } else if (error instanceof Error) {
    throw new Error(`Failed to fetch Pokemon data: ${error.message}`);
  } else {
    throw new Error('Failed to fetch Pokemon data: An unknown error occurred.');
  }
}