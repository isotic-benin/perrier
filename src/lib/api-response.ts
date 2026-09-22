export interface ApiSuccess<T> {
  succes: true;
  donnees: T;
}

export interface ApiError {
  succes: false;
  erreur: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

export function apiSuccess<T>(donnees: T, init?: ResponseInit): Response {
  return Response.json(
    { succes: true, donnees } satisfies ApiResponse<T>,
    init,
  );
}

export function apiErreur(message: string, status = 400): Response {
  return Response.json(
    { succes: false, erreur: message } satisfies ApiResponse,
    { status },
  );
}
