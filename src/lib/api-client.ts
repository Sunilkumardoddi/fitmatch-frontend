/**
 * FitMatch API Client (Re-export Facade for Backward Compatibility)
 * Version: 2.0.0
 * Split into consumerApi and adminApi
 */

export * from './api/client-base';
export * from './api/consumer-api';
export * from './api/admin-api';

import { consumerApi } from './api/consumer-api';
export const apiClient = consumerApi;
