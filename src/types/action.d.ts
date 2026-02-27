export interface SuccessActionState<T> {
  success: true
  data?: T
  message?: string
}

type ActionError<T> =
  | { type: "validation"; issues: Partial<Record<keyof T, string[]>> }
  | { type: "auth"; error?: Error }
  | { type: "unknown"; error?: Error }

export interface ErrorActionState<T> {
  success: false
  error: ActionError<T>
  message?: string
}

export type ActionState<T> = SuccessActionState<T> | ErrorActionState<T>
