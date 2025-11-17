import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '../model/useAuthStore';
import {
  loginRequest,
  type LoginPayload,
  type LoginResponse,
} from '../api/authApi';
import type { ApiError } from '@shared/api/apiError';
import { applyAuth, clearAuth } from '../lib/tokenStorage';

export const useLogin = () => {
  const setStatus = useAuthStore((s) => s.setStatus);

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: loginRequest,
    onMutate: () => {
      setStatus('checking');
    },
    onSuccess: async (data) => {
      await applyAuth(data.token);
    },
    onError: async () => {
      await clearAuth();
    },
  });
};
