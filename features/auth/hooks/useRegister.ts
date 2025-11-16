// features/auth/hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import type { ApiError } from '@shared/api/apiError';
import { registerRequest, type RegisterPayload } from '../api/authApi';

export const useRegister = () => {
  return useMutation<void, ApiError, RegisterPayload>({
    mutationFn: registerRequest,
  });
};
