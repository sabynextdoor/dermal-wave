declare global {
  interface Window {
    Clerk: any;
  }
}

// Backend API base URL. Override with NEXT_PUBLIC_API_URL if the API is hosted elsewhere.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint: string, options: RequestInit & { token?: string | null } = {}) => {
  const { token, ...fetchOptions } = options;
  let authToken = token;
  
  if (!authToken && typeof window !== 'undefined' && window.Clerk && window.Clerk.session) {
    authToken = await window.Clerk.session.getToken();
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...fetchOptions.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'API request failed');
  }

  return response.json();
};
