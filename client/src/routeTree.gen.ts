/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as appIndexImport } from './routes/(app)/index'
import { Route as authSignupImport } from './routes/(auth)/signup'
import { Route as authLoginImport } from './routes/(auth)/login'
import { Route as appProfileImport } from './routes/(app)/profile'
import { Route as appProductsImport } from './routes/(app)/products'
import { Route as appInvoicesImport } from './routes/(app)/invoices'
import { Route as appDashboardImport } from './routes/(app)/dashboard'
import { Route as appCustomersImport } from './routes/(app)/customers'
import { Route as appInvoiceIndexImport } from './routes/(app)/invoice/index'
import { Route as appInvoiceInvoiceIdIndexImport } from './routes/(app)/invoice/$invoiceId/index'
import { Route as appInvoiceInvoiceIdInvoicePreviewImport } from './routes/(app)/invoice/$invoiceId/invoice-preview'

// Create/Update Routes

const appIndexRoute = appIndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const authSignupRoute = authSignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const appProfileRoute = appProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const appProductsRoute = appProductsImport.update({
  path: '/products',
  getParentRoute: () => rootRoute,
} as any)

const appInvoicesRoute = appInvoicesImport.update({
  path: '/invoices',
  getParentRoute: () => rootRoute,
} as any)

const appDashboardRoute = appDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const appCustomersRoute = appCustomersImport.update({
  path: '/customers',
  getParentRoute: () => rootRoute,
} as any)

const appInvoiceIndexRoute = appInvoiceIndexImport.update({
  path: '/invoice/',
  getParentRoute: () => rootRoute,
} as any)

const appInvoiceInvoiceIdIndexRoute = appInvoiceInvoiceIdIndexImport.update({
  path: '/invoice/$invoiceId/',
  getParentRoute: () => rootRoute,
} as any)

const appInvoiceInvoiceIdInvoicePreviewRoute =
  appInvoiceInvoiceIdInvoicePreviewImport.update({
    path: '/invoice/$invoiceId/invoice-preview',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(app)/customers': {
      id: '/customers'
      path: '/customers'
      fullPath: '/customers'
      preLoaderRoute: typeof appCustomersImport
      parentRoute: typeof rootRoute
    }
    '/(app)/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof appDashboardImport
      parentRoute: typeof rootRoute
    }
    '/(app)/invoices': {
      id: '/invoices'
      path: '/invoices'
      fullPath: '/invoices'
      preLoaderRoute: typeof appInvoicesImport
      parentRoute: typeof rootRoute
    }
    '/(app)/products': {
      id: '/products'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof appProductsImport
      parentRoute: typeof rootRoute
    }
    '/(app)/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof appProfileImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof authSignupImport
      parentRoute: typeof rootRoute
    }
    '/(app)/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appIndexImport
      parentRoute: typeof rootRoute
    }
    '/(app)/invoice/': {
      id: '/invoice/'
      path: '/invoice'
      fullPath: '/invoice'
      preLoaderRoute: typeof appInvoiceIndexImport
      parentRoute: typeof rootRoute
    }
    '/(app)/invoice/$invoiceId/invoice-preview': {
      id: '/invoice/$invoiceId/invoice-preview'
      path: '/invoice/$invoiceId/invoice-preview'
      fullPath: '/invoice/$invoiceId/invoice-preview'
      preLoaderRoute: typeof appInvoiceInvoiceIdInvoicePreviewImport
      parentRoute: typeof rootRoute
    }
    '/(app)/invoice/$invoiceId/': {
      id: '/invoice/$invoiceId/'
      path: '/invoice/$invoiceId'
      fullPath: '/invoice/$invoiceId'
      preLoaderRoute: typeof appInvoiceInvoiceIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  appCustomersRoute,
  appDashboardRoute,
  appInvoicesRoute,
  appProductsRoute,
  appProfileRoute,
  authLoginRoute,
  authSignupRoute,
  appIndexRoute,
  appInvoiceIndexRoute,
  appInvoiceInvoiceIdInvoicePreviewRoute,
  appInvoiceInvoiceIdIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/customers",
        "/dashboard",
        "/invoices",
        "/products",
        "/profile",
        "/login",
        "/signup",
        "/",
        "/invoice/",
        "/invoice/$invoiceId/invoice-preview",
        "/invoice/$invoiceId/"
      ]
    },
    "/customers": {
      "filePath": "(app)/customers.tsx"
    },
    "/dashboard": {
      "filePath": "(app)/dashboard.tsx"
    },
    "/invoices": {
      "filePath": "(app)/invoices.tsx"
    },
    "/products": {
      "filePath": "(app)/products.tsx"
    },
    "/profile": {
      "filePath": "(app)/profile.tsx"
    },
    "/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/signup": {
      "filePath": "(auth)/signup.tsx"
    },
    "/": {
      "filePath": "(app)/index.tsx"
    },
    "/invoice/": {
      "filePath": "(app)/invoice/index.tsx"
    },
    "/invoice/$invoiceId/invoice-preview": {
      "filePath": "(app)/invoice/$invoiceId/invoice-preview.tsx"
    },
    "/invoice/$invoiceId/": {
      "filePath": "(app)/invoice/$invoiceId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
