import type { AxiosError } from 'axios';

type ApiErrorResponse = {
  message?: string;
  detail?: string;
  error?: string;
} | string | null;

export type ApiError = AxiosError<ApiErrorResponse>;

export const getApiErrorMessage = (error: ApiError): string => {
  console.log('API ERROR RAW >>>', {
    code: error.code,
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
  });

  // 1. Нет ответа от сервера (network-level)
  if (!error.response) {
    return 'Не удалось подключиться к серверу. Проверьте интернет или попробуйте позже.';
  }

  const status = error.response.status;
  const data = error.response.data;

  // 2. Кейс "неверный логин/пароль"
  if (status === 400 || status === 401) {
    if (typeof data === 'string') return data;
    if (data?.message) return data.message;
    if (data?.detail) return data.detail;
    if (data?.error) return data.error;
    return 'Неверный email или пароль.';
  }

  // 3. Если сервер вернул просто строку
  if (typeof data === 'string') {
    return data;
  }

  // 4. Типовая структура с message/detail/error
  if (data && typeof data === 'object') {
    if (data.message) return data.message;
    if (data.detail) return data.detail;
    if (data.error) return data.error;
  }

  // 5. Фоллбек
  return 'Произошла ошибка. Попробуйте ещё раз.';
};
