/**
 * FitMatch Frontend UI & Accessibility Test Suite
 * Validates component rendering, interactive visual guidelines, accessibility attributes,
 * anthropometric boundaries, mathematical conversions, and brand neutrality rules.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Components
import { BodyMeasurementVisualGuide } from '../components/consumer/BodyMeasurementVisualGuide.js';
import { GarmentFlatVisualGuide } from '../components/consumer/GarmentFlatVisualGuide.js';
import { GarmentCutVisualizer } from '../components/consumer/GarmentCutVisualizer.js';
import { GuidedMeasurementModal } from '../components/consumer/GuidedMeasurementModal.js';
import { FitVisualizer } from '../components/consumer/FitVisualizer.js';
import { SizeBadge } from '../components/shared/SizeBadge.js';
import { MeasurementInput } from '../components/consumer/MeasurementInput.js';

// Helper to strip React SSR comments and normalize HTML entities
function cleanHtml(html) {
  return html
    .replace(/<!--.*?-->/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&');
}

test('1. BodyMeasurementVisualGuide — Interactive Anatomical Body Tape Guide', async (t) => {
  await t.test('should render accessible SVG silhouette with chest and waist guidelines', () => {
    const raw = ReactDOMServer.renderToString(
      React.createElement(BodyMeasurementVisualGuide, {
        activeZone: 'CHEST',
        chestVal: 39.0,
        waistVal: 32.0,
        unit: 'in',
        interactive: true,
      })
    );
    const html = cleanHtml(raw);

    // Assert SVG and accessibility attributes
    assert.match(html, /<svg[^>]*aria-label="Interactive body measurement guidelines diagram"/);
    assert.match(html, /role="img"/);

    // Assert Chest Guideline elements
    assert.match(html, /Chest Guideline \(Fullest Point\)/);
    assert.match(html, /39 in/);

    // Assert Waist Guideline elements
    assert.match(html, /Waist Guideline \(Natural Waist\)/);
    assert.match(html, /32 in/);

    // Assert interactive zone prompt
    assert.match(html, /Click zone to focus/);
  });

  await t.test('should format metric centimeters accurately', () => {
    const raw = ReactDOMServer.renderToString(
      React.createElement(BodyMeasurementVisualGuide, {
        activeZone: 'WAIST',
        chestVal: 99.0,
        waistVal: 81.0,
        unit: 'cm',
        interactive: false,
      })
    );
    const html = cleanHtml(raw);

    assert.match(html, /99 cm/);
    assert.match(html, /81 cm/);
    assert.match(html, /Neutral anatomical guide/);
  });
});

test('2. GarmentFlatVisualGuide — Flat Garment Pit-to-Pit Ruler Guide', async (t) => {
  await t.test('should calculate finished garment and estimated body chest from pit-to-pit in inches', () => {
    const raw = ReactDOMServer.renderToString(
      React.createElement(GarmentFlatVisualGuide, {
        pitToPitVal: 21.0,
        unit: 'in',
        interactive: true,
      })
    );
    const html = cleanHtml(raw);

    // Pit-to-Pit: 21 in
    assert.match(html, /21 in/);

    // Finished garment: 21.0 * 2 = 42 in
    assert.match(html, /42 in/);

    // Body chest: 42 - 3.0 = 39 in
    assert.match(html, /39 in/);

    // Assert tailor's ruler SVG elements
    assert.match(html, /<svg[^>]*aria-label="Illustration of a casual shirt laid flat/);
    assert.match(html, /rulerGrad/);
  });

  await t.test('should calculate finished garment and estimated body chest in centimeters', () => {
    const raw = ReactDOMServer.renderToString(
      React.createElement(GarmentFlatVisualGuide, {
        pitToPitVal: 53.0,
        unit: 'cm',
        interactive: true,
      })
    );
    const html = cleanHtml(raw);

    // Finished garment: 53.0 * 2 = 106 cm
    assert.match(html, /106 cm/);

    // Body chest: 106 - 7.6 = 98.4 cm
    assert.match(html, /98.4 cm/);
  });
});

test('3. GarmentCutVisualizer — Garment Pattern Cut & Sizing Guidelines', async (t) => {
  const categories = [
    { code: 'SHIRT_CASUAL', cutName: 'Modern Slim / Tailored Fit', ease: '+3.0" Design Ease' },
    { code: 'SHIRT_FORMAL', cutName: 'Classic Executive Cut', ease: '+4.0" Design Ease' },
    { code: 'TSHIRT_REGULAR', cutName: 'Standard Regular Fit', ease: '+2.0" Design Ease' },
    { code: 'TSHIRT_OVERSIZED', cutName: 'Drop-Shoulder Boxy Silhouette', ease: '+6.0" Design Ease' },
  ];

  for (const cat of categories) {
    await t.test(`should render correct cut specs for ${cat.code}`, () => {
      const raw = ReactDOMServer.renderToString(
        React.createElement(GarmentCutVisualizer, {
          categoryCode: cat.code,
          unit: 'in',
        })
      );
      const html = cleanHtml(raw);

      assert.ok(html.includes(cat.cutName), `Expected ${cat.cutName} in HTML`);
      assert.ok(html.includes(cat.ease), `Expected ${cat.ease} in HTML`);
      assert.match(html, /Chest Guideline/);
      assert.match(html, /Shoulder/);
      assert.match(html, /Length/);
    });
  }
});

test('4. GuidedMeasurementModal — Onboarding Modal with Visual Tabs', async (t) => {
  await t.test('should return null when closed', () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(GuidedMeasurementModal, {
        isOpen: false,
        onClose: () => {},
        unit: 'in',
        onApplyMeasurement: () => {},
      })
    );
    assert.equal(html, '');
  });

  await t.test('should render accessible modal dialog with touch targets >= 44px when open', () => {
    const raw = ReactDOMServer.renderToString(
      React.createElement(GuidedMeasurementModal, {
        isOpen: true,
        onClose: () => {},
        unit: 'in',
        onApplyMeasurement: () => {},
      })
    );
    const html = cleanHtml(raw);

    assert.match(html, /role="dialog"/);
    assert.match(html, /aria-modal="true"/);
    assert.match(html, /aria-labelledby="guide-title"/);

    // Check touch target standards for mobile accessibility
    assert.match(html, /min-h-\[44px\]/);
    assert.match(html, /min-w-\[44px\]/);

    // Check presets are rendered
    assert.match(html, /38.0 in/);
    assert.match(html, /40.0 in/);
    assert.match(html, /42.0 in/);
  });
});

test('5. FitVisualizer — Torso Cross-Section & Comfort Fit Diagram', async (t) => {
  await t.test('should render torso cross-section and accessible table metrics', () => {
    const mockMargin = {
      dimension: 'CHEST',
      bodyMeasurementMm: 991, // ~39.0 in
      garmentDimensionMm: 1067, // ~42.0 in
      easeMm: 76, // ~3.0 in
      easeInches: 3.0,
      status: 'OPTIMAL',
    };

    const raw = ReactDOMServer.renderToString(
      React.createElement(FitVisualizer, {
        margin: mockMargin,
        unit: 'in',
        dimensionLabel: 'Chest',
        preference: 'REGULAR',
      })
    );
    const html = cleanHtml(raw);

    // Assert SVG cross section
    assert.match(html, /<svg[^>]*aria-label="Cross-section diagram comparing body contour and garment ease contour"/);
    assert.match(html, /Your Body/);
    assert.match(html, /39.0 in/);
    assert.match(html, /42.0 in/);
    assert.match(html, /\+3(\.0)?" Design Ease/);

    // Assert accessible table metrics (WCAG 2.2 AA)
    assert.match(html, /991 mm/);
    assert.match(html, /1067 mm/);
    assert.match(html, /\+76 mm/);
  });
});

test('6. SizeBadge & MeasurementInput — Micro-Components & Validation', async (t) => {
  await t.test('should render SizeBadge with size and OPTIMAL status', () => {
    const raw = ReactDOMServer.renderToString(
      React.createElement(SizeBadge, {
        size: 'L',
        status: 'OPTIMAL',
        showPercentage: false,
      })
    );
    const html = cleanHtml(raw);
    assert.match(html, /Size L/);
  });

  await t.test('should render MeasurementInput with accessibility bindings', () => {
    const raw = ReactDOMServer.renderToString(
      React.createElement(MeasurementInput, {
        id: 'test-chest',
        label: 'Chest Measurement',
        sublabel: 'Measured around fullest point',
        value: 39.0,
        unit: 'in',
        onChange: () => {},
      })
    );
    const html = cleanHtml(raw);

    assert.match(html, /id="test-chest"/);
    assert.match(html, /Chest Measurement/);
    assert.match(html, /value="39"/);
    assert.match(html, /aria-invalid="false"/);
  });

  await t.test('should trigger alert when measurement is out of anthropometric bounds', () => {
    const raw = ReactDOMServer.renderToString(
      React.createElement(MeasurementInput, {
        id: 'test-chest-out-of-bounds',
        label: 'Chest Measurement',
        value: 95.0, // Implausible adult chest in inches
        unit: 'in',
        min: 24,
        max: 65,
        onChange: () => {},
      })
    );
    const html = cleanHtml(raw);

    assert.match(html, /role="alert"/);
    assert.match(html, /Typical adult measurements fall between 24 and 65 in/);
    assert.match(html, /aria-invalid="true"/);
  });
});

test('7. Brand Voice & Body Neutrality Rules (AENG-BRAND-01)', async () => {
  const renderedSnippets = [
    ReactDOMServer.renderToString(React.createElement(BodyMeasurementVisualGuide, { unit: 'in' })),
    ReactDOMServer.renderToString(React.createElement(GarmentFlatVisualGuide, { unit: 'in' })),
    ReactDOMServer.renderToString(React.createElement(GarmentCutVisualizer, { categoryCode: 'SHIRT_CASUAL', unit: 'in' })),
    ReactDOMServer.renderToString(React.createElement(FitVisualizer, {
      margin: { dimension: 'CHEST', bodyMeasurementMm: 990, garmentDimensionMm: 1067, easeMm: 76, easeInches: 3.0, status: 'OPTIMAL' },
      unit: 'in'
    })),
  ].join(' ').toLowerCase();

  const bannedTerms = ['skinny', 'fat', 'diet', 'shame', 'slimming', 'flattering', 'guarantee a perfect fit', 'perfect body'];
  for (const term of bannedTerms) {
    assert.equal(
      renderedSnippets.includes(term),
      false,
      `Violation: UI components contain non-neutral term: "${term}"`
    );
  }
});
