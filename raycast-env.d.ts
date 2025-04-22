/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Separators - Steps query possible separator */
  "querySeparators": string,
  /** Query wildcard - Wildcard to replace query */
  "queryWildcard": string,
  /** Default browser - Default browser to open links */
  "defaultBrowser"?: import("@raycast/api").Application,
  /** Default config app - Default app to edit config file */
  "defaultConfigApp"?: import("@raycast/api").Application
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `createStepForm` command */
  export type CreateStepForm = ExtensionPreferences & {}
  /** Preferences accessible in the `importStepsConfig` command */
  export type ImportStepsConfig = ExtensionPreferences & {}
  /** Preferences accessible in the `exportStepsConfig` command */
  export type ExportStepsConfig = ExtensionPreferences & {}
  /** Preferences accessible in the `importStepsConfigBrowserBookmarks` command */
  export type ImportStepsConfigBrowserBookmarks = ExtensionPreferences & {}
  /** Preferences accessible in the `exportStepsConfigBrowserBookmarks` command */
  export type ExportStepsConfigBrowserBookmarks = ExtensionPreferences & {}
  /** Preferences accessible in the `importStepsConfigQuickLinks` command */
  export type ImportStepsConfigQuickLinks = ExtensionPreferences & {}
  /** Preferences accessible in the `exportStepsConfigQuickLinks` command */
  export type ExportStepsConfigQuickLinks = ExtensionPreferences & {}
  /** Preferences accessible in the `openSteppedLink` command */
  export type OpenSteppedLink = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `createStepForm` command */
  export type CreateStepForm = {}
  /** Arguments passed to the `importStepsConfig` command */
  export type ImportStepsConfig = {}
  /** Arguments passed to the `exportStepsConfig` command */
  export type ExportStepsConfig = {}
  /** Arguments passed to the `importStepsConfigBrowserBookmarks` command */
  export type ImportStepsConfigBrowserBookmarks = {}
  /** Arguments passed to the `exportStepsConfigBrowserBookmarks` command */
  export type ExportStepsConfigBrowserBookmarks = {}
  /** Arguments passed to the `importStepsConfigQuickLinks` command */
  export type ImportStepsConfigQuickLinks = {}
  /** Arguments passed to the `exportStepsConfigQuickLinks` command */
  export type ExportStepsConfigQuickLinks = {}
  /** Arguments passed to the `openSteppedLink` command */
  export type OpenSteppedLink = {}
}

