/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_LoginSuccess {
  __typename: "LoginSuccess";
  token: string;
}

export interface Login_login_EmailNotFoundError {
  __typename: "EmailNotFoundError";
  message: string;
}

export interface Login_login_PasswordIncorrectError {
  __typename: "PasswordIncorrectError";
  message: string;
}

export type Login_login = Login_login_LoginSuccess | Login_login_EmailNotFoundError | Login_login_PasswordIncorrectError;

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}
