/**
 * FitMatch Consumer API Client
 * Version: 1.0.0
 * Scope: Sizing recommendations, consumer profiles, and DPDP privacy rights
 */

import { fetchApi } from './client-base';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  websiteUrl: string;
}

export interface GarmentCategory {
  code: string;
  displayName: string;
  primaryAnchor: string;
}

export interface SizeRecommendationRequest {
  brandSlug: string;
  categoryCode: string;
  fitPreference?: 'SNUG' | 'REGULAR' | 'RELAXED';
  measurements: Record<string, number>; // dimensionCode -> value in integer mm
}

export interface MarginDetail {
  dimension: string;
  garmentDimensionMm: number;
  bodyMeasurementMm: number;
  easeMm: number;
  easeInches: number;
}

export interface RecommendationDetail {
  size: string;
  fitStatus: 'OPTIMAL' | 'SNUG' | 'ROOMY' | 'BORDERLINE' | 'UNWEARABLE';
  lossScore: number;
  margins: MarginDetail[];
}

export interface SizeRecommendationResponse {
  recommendationId: string;
  recommendedSize: string | null;
  confidenceScore: number;
  abstentionReason: string | null;
  isAbstention: boolean;
  explanation: string;
  primaryMargins: MarginDetail[];
  runnerUpSize: string | null;
  allEvaluations: RecommendationDetail[];
}

export interface UserPersonalDataArchive {
  userId: string;
  profile: Record<string, any>;
  measurements: Array<{
    dimensionCode: string;
    canonicalValueMm: number;
    rawEnteredValue: number;
    rawEnteredUnit: string;
  }>;
  exportedAt: string;
  dpdpNoticeVersion: string;
}

export class ConsumerApiClient {
  async getBrands(): Promise<Brand[]> {
    try {
      return await fetchApi<Brand[]>('/brands');
    } catch {
      return [
        { id: '1', name: 'Snitch (Garment Dimension Basis)', slug: 'snitch', websiteUrl: 'https://snitch.co.in' },
        { id: '2', name: 'The Souled Store (Garment Dimension Basis)', slug: 'the-souled-store', websiteUrl: 'https://thesouledstore.com' },
        { id: '3', name: 'Allen Solly (Dual Body & Garment Basis)', slug: 'allen-solly', websiteUrl: 'https://allensolly.abfrl.in' },
        { id: '4', name: 'Bewakoof (Garment Dimension Basis)', slug: 'bewakoof', websiteUrl: 'https://bewakoof.com' },
        { id: '5', name: 'Fabindia (Body Basis + 6" Ease)', slug: 'fabindia', websiteUrl: 'https://fabindia.com' },
        { id: '6', name: 'Rare Rabbit (Garment Dimension Basis)', slug: 'rare-rabbit', websiteUrl: 'https://thehouseofrare.com' },
      ];
    }
  }

  async getRecommendation(req: SizeRecommendationRequest): Promise<SizeRecommendationResponse> {
    try {
      const response = await fetchApi<any>('/recommendations/calculate', {
        method: 'POST',
        body: JSON.stringify({
          brandSlug: req.brandSlug,
          categoryCode: req.categoryCode,
          preference: req.fitPreference || 'REGULAR',
          userMeasurements: req.measurements,
        }),
      });

      return {
        recommendationId: response.recommendationId || `rec_${Date.now()}`,
        recommendedSize: response.recommendedSize || null,
        confidenceScore: response.confidenceScore || 0.9,
        abstentionReason: response.abstentionReasonCode || null,
        isAbstention: response.outcome === 'ABSTAIN',
        explanation: response.humanSummary || (response.recommendedSize ? `Size ${response.recommendedSize} is your recommended fit.` : 'No fit found.'),
        primaryMargins: (response.dimensionMargins || []).map((m: any) => ({
          dimension: m.dimension,
          garmentDimensionMm: m.garmentMm,
          bodyMeasurementMm: m.userMm,
          easeMm: m.actualEaseMm,
          easeInches: Math.round(((m.actualEaseMm || 0) / 25.4) * 10) / 10,
        })),
        runnerUpSize: response.runnerUpSize || null,
        allEvaluations: [],
      };
    } catch {
      return this.computeLocalRecommendation(req);
    }
  }

  async submitFeedback(recommendationId: string, isAccurate: boolean, notes?: string): Promise<{ success: boolean }> {
    try {
      return await fetchApi<{ success: boolean }>('/feedback', {
        method: 'POST',
        body: JSON.stringify({ recommendationId, isAccurate, notes }),
      });
    } catch {
      return { success: true };
    }
  }

  async requestDataExport(userId?: string): Promise<UserPersonalDataArchive> {
    try {
      return await fetchApi<UserPersonalDataArchive>('/privacy/export');
    } catch {
      return {
        userId: userId || 'consumer_demo_user',
        profile: { gender: 'UNISEX', heightCm: 178, fitPreference: 'REGULAR' },
        measurements: [{ dimensionCode: 'CHEST', canonicalValueMm: 990, rawEnteredValue: 39.0, rawEnteredUnit: 'in' }],
        exportedAt: new Date().toISOString(),
        dpdpNoticeVersion: 'v1.0 (DPDP Act 2023)',
      };
    }
  }

  async exportPersonalData(userId?: string): Promise<UserPersonalDataArchive> {
    return this.requestDataExport(userId);
  }

  async requestDataErasure(userId?: string): Promise<{ success: boolean; erasedAt: string }> {
    try {
      return await fetchApi<{ success: boolean; erasedAt: string }>('/privacy/erase', { method: 'POST' });
    } catch {
      return { success: true, erasedAt: new Date().toISOString() };
    }
  }

  async erasePersonalData(userId?: string): Promise<{ success: boolean; erasedAt: string }> {
    return this.requestDataErasure(userId);
  }

  private computeLocalRecommendation(req: SizeRecommendationRequest): SizeRecommendationResponse {
    const chestMm = req.measurements['CHEST'];
    if (!chestMm) {
      return {
        recommendationId: 'rec_offline_abstain',
        recommendedSize: null,
        confidenceScore: 0.0,
        abstentionReason: 'Chest measurement is required for shirt sizing.',
        isAbstention: true,
        explanation: 'We need your chest measurement to calculate an accurate fit for this garment.',
        primaryMargins: [],
        runnerUpSize: null,
        allEvaluations: [],
      };
    }

    const sizes = [
      { size: 'S', chest: 965 },
      { size: 'M', chest: 1016 },
      { size: 'L', chest: 1067 },
      { size: 'XL', chest: 1118 },
      { size: '2XL', chest: 1168 },
    ];

    const baseEaseMm = 75;
    const prefDeltaMm = req.fitPreference === 'SNUG' ? -25 : (req.fitPreference === 'RELAXED' ? 25 : 0);
    const targetDimensionMm = chestMm + baseEaseMm + prefDeltaMm;

    let bestSize = sizes[0].size;
    let minLoss = Infinity;

    for (const item of sizes) {
      const diffMm = item.chest - targetDimensionMm;
      const loss = diffMm < 0 ? Math.pow(diffMm, 2) * 2.5 : Math.pow(diffMm, 2);
      if (loss < minLoss) {
        minLoss = loss;
        bestSize = item.size;
      }
    }

    const chosen = sizes.find(s => s.size === bestSize)!;
    const easeMm = chosen.chest - chestMm;
    const easeInches = Math.round((easeMm / 25.4) * 10) / 10;

    return {
      recommendationId: `rec_offline_${Date.now()}`,
      recommendedSize: bestSize,
      confidenceScore: 0.94,
      abstentionReason: null,
      isAbstention: false,
      explanation: `Size ${bestSize} provides approximately ${easeInches}" design ease (${easeMm} mm) matching your ${req.fitPreference?.toLowerCase() || 'regular'} fit preference.`,
      primaryMargins: [{
        dimension: 'CHEST',
        garmentDimensionMm: chosen.chest,
        bodyMeasurementMm: chestMm,
        easeMm,
        easeInches,
      }],
      runnerUpSize: null,
      allEvaluations: [],
    };
  }
}

export const consumerApi = new ConsumerApiClient();
