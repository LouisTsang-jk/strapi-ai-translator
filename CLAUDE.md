# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Strapi v5 plugin for AI-powered translation, providing one-click translation of content with custom subjects and glossaries.

## Architecture

### Dual Package Structure
- **`/admin`**: Frontend React components and admin panel integration
- **`/server`**: Backend controllers, services, routes, and plugin configuration

### Plugin Entry Points
- Admin entry: `admin/src/index.ts` - registers plugin in Strapi admin panel
- Server entry: `server/src/index.ts` - exports all server-side functionality

### Key Directories
- `server/src/controllers/` - API endpoint handlers
- `server/src/services/` - Business logic and translation services
- `server/src/routes/` - API route definitions
- `admin/src/components/` - React UI components
- `admin/src/pages/` - Main application pages

## Development Commands

### Building
```bash
npm run build          # Build both admin and server
npm run watch          # Watch mode for development
npm run watch:link     # Watch mode with linking for testing
```

### Type Checking
```bash
npm run test:ts:front  # TypeScript check for admin
npm run test:ts:back   # TypeScript check for server
```

### Plugin Verification
```bash
npm run verify         # Verify plugin structure and configuration
```

## Plugin Configuration

The plugin follows Strapi v5 plugin conventions:
- Plugin ID: `strapi-plugin-ai-translate`
- Display Name: "AI Translate"
- Exports: CommonJS with dual admin/server entry points
- Build tool: `strapi-plugin` CLI

## TypeScript Configuration

Separate TypeScript configurations for admin and server:
- `admin/tsconfig.json` - Frontend configuration
- `server/tsconfig.json` - Backend configuration
- Both have corresponding `.build.json` variants for production builds