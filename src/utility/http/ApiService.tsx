/* eslint-disable comma-spacing */
import {
  MutationFunction,
  MutationKey,
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, HttpStatusCode } from "axios";
import { httpClient } from "./ApiConfig";

// <T> 선언 https://github.com/typescript-eslint/typescript-eslint/issues/4062
export interface IError<T> extends AxiosError<T, any> {
  readonly code: string;
  readonly message: string;
  msgArgs?: Array<string> | Array<number>;
}

// TODO 공통 response 정의
export type ApiResponse<T> = T & T[];
export type ApiRequest<T = unknown> = T;

export const getAll = async <ApiRequest,>(
  url: string,
  config?: AxiosRequestConfig<ApiRequest>
) => {
  const response = await httpClient.get<ApiResponse<ApiRequest>>(url, {
    ...config,
  });
  return response.data;
};

export const get = async <ApiRequest,>(
  url: string,
  config?: AxiosRequestConfig<ApiRequest>
) => {
  const response = await httpClient.get<ApiResponse<ApiRequest>>(url, {
    ...config,
  });
  return response.data;
};

export const post = async <ApiRequest,>(
  url: string,
  data: ApiRequest,
  config?: AxiosRequestConfig<ApiRequest>
) => {
  const response = await httpClient.post<ApiResponse<ApiRequest>>(url, data, {
    ...config,
  });
  return response.data;
};

export const put = async <ApiRequest,>(
  url: string,
  data: ApiRequest,
  config?: AxiosRequestConfig<ApiRequest>
) => {
  const response = await httpClient.put<ApiResponse<ApiRequest>>(url, data, {
    ...config,
  });
  return response.data;
};

export const patch = async <ApiRequest,>(
  url: string,
  data: ApiRequest,
  config?: AxiosRequestConfig<ApiRequest>
) => {
  const response = await httpClient.patch<ApiResponse<ApiRequest>>(url, data, {
    ...config,
  });
  return response.data;
};

export const remove = async <ApiRequest,>(
  url: string,
  config?: AxiosRequestConfig<ApiRequest>
) => {
  const response = await httpClient.delete<ApiResponse<ApiRequest>>(url, {
    ...config,
  });
  return response.data;
};

export const useWrapQuery = <
  TQueryFnData = unknown,
  TError extends IError<TQueryFnData> = IError<TQueryFnData> & unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, TError> => {
  const query = useQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    queryFn,
    {
      ...options,
    }
  );

  return query;
};

export const useWrapMuation = <
  // TODO dto가 들어갈수 있음
  // TVariables = void | TUserRequest,
  TVariables = void | any,
  // TODO dto가 들어갈수 있음
  // TData = unknown | TUserResponse,
  TData = unknown | any,
  TError extends IError<TData> = IError<TData> & unknown,
  TContext = unknown,
  TMutationKey extends MutationKey = MutationKey
>(
  mutationKey: TMutationKey,
  mutationFn?: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationKey" | "mutationFn"
  >
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const muation = useMutation<TData, TError, TVariables, TContext>(
    mutationKey,
    mutationFn,
    {
      ...options,
    }
  );

  return muation;
};

export const commonErrorCallback = <
  TData = unknown | any,
  TError extends IError<TData> = IError<TData> & unknown
>(
  error: TError
) => {
  let errResponse: any;
  if (error.status === HttpStatusCode.NotFound) {
    errResponse = {
      status: error.status ?? HttpStatusCode.NotFound,
      code: error.code,
      message:
        "서버로부터 응답이 없습니다. 관리자에게 문의하여 주시기 바랍니다.",
    };
  } else {
    errResponse = {
      code: error.code,
      status: error.status ? error.status : error.message ?? error,
      error: error,
      message: error.message
        ? error.message.replace("\n", "<br />")
        : error.message
        ? error.message.replace("\n", "<br />")
        : `${error}(${error.status})`,
    };
  }
  console.error(`[HTTP Code] ${errResponse.code}`);
  console.error(`[HTTP Error] ${errResponse.message}`);
  console.error(`[HTTP Stack] ${error.stack}`);
};
