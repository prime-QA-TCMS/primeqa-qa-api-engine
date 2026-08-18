# Prime QA — QA API Engine

Reusable API automation engine for Prime QA test automation.

## Responsibility

This repository owns HTTP/API execution primitives only: request construction, headers/auth injection, JSON handling, response capture, and generic status/body assertions.

It must **not** contain Prime QA business test cases or cross-layer scenarios. Those belong in `primeqa-qa-test-automation`.

## Dependency direction

`primeqa-qa-test-automation` → `primeqa-qa-api-engine` → TCMS APIs

The API engine must not depend on the UI engine.

## Usage

```ts
import { ApiEngine } from '@primeqa/qa-api-engine';

const api = new ApiEngine(request, {
  baseUrl: process.env.API_BASE_URL!,
  headers: { Authorization: `Bearer ${token}` },
});

const response = await api.post('/projects', { name: 'Example' });
api.expectStatus(response, 201);
```

Domain-specific clients and business flows should be implemented in the central automation repository on top of this engine.
