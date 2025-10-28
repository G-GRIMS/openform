/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as CustomPassword from "../CustomPassword.js";
import type * as ResendOTPPasswordReset from "../ResendOTPPasswordReset.js";
import type * as analytics_get_metrics from "../analytics/get_metrics.js";
import type * as analytics_track_view from "../analytics/track_view.js";
import type * as auth from "../auth.js";
import type * as form_fields_create from "../form_fields/create.js";
import type * as form_fields_delete from "../form_fields/delete.js";
import type * as form_fields_update from "../form_fields/update.js";
import type * as forms_create from "../forms/create.js";
import type * as forms_delete from "../forms/delete.js";
import type * as forms_get from "../forms/get.js";
import type * as forms_update from "../forms/update.js";
import type * as http from "../http.js";
import type * as submissions_create from "../submissions/create.js";
import type * as submissions_get from "../submissions/get.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  CustomPassword: typeof CustomPassword;
  ResendOTPPasswordReset: typeof ResendOTPPasswordReset;
  "analytics/get_metrics": typeof analytics_get_metrics;
  "analytics/track_view": typeof analytics_track_view;
  auth: typeof auth;
  "form_fields/create": typeof form_fields_create;
  "form_fields/delete": typeof form_fields_delete;
  "form_fields/update": typeof form_fields_update;
  "forms/create": typeof forms_create;
  "forms/delete": typeof forms_delete;
  "forms/get": typeof forms_get;
  "forms/update": typeof forms_update;
  http: typeof http;
  "submissions/create": typeof submissions_create;
  "submissions/get": typeof submissions_get;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
