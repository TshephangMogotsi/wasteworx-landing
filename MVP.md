# WasteWorx: one-day working demo

## Client and purpose

The user is an organisation's operations or sustainability lead. They supply
individual records containing a date, material type and weight. They need to
understand their recorded quantities and take an accurate summary into reporting.
This is organisation-specific, not campus-specific.

Tomorrow's deliverable is a working demo with synthetic or anonymised data.
It is not a production pilot handling confidential client records.

**One complete flow: import CSV → understand quantities → filter records → export CSV.**

## Two screens

### Overview — mvp-dashboard.html

- Reporting month selector, defaulting to the latest month in the dataset.
- Total recorded kilograms, number of entries, number of materials and largest material.
- Monthly recorded-weight trend for up to six months ending in the selected month.
- Material composition for the selected month, showing kg and percentage.
- Recent entries linking to the full records page.
- All totals and charts derive from the same imported dataset.

### Waste records — mvp-records.html

- Import one CSV using a fixed template; no field-mapping wizard.
- Preview filename, number of rows and period covered before confirming import.
- Validate every row before replacing the current dataset. Invalid files show
  row numbers and reasons; leave existing data unchanged. No partial import.
- Filter by reporting month and material. No free-text search or advanced filters.
- Display date, material and weight, newest date first, in a scrolling table.
- Export the currently filtered rows as CSV; counts and displayed totals match it.
- No row editing, bulk actions, manual entry or pagination.

## Import contract

Required columns: `date,material,weight_kg`.

- Date: a real calendar date in YYYY-MM-DD format.
- Material: a nonempty label; trim whitespace and normalise case for grouping.
  Do not restrict the app to the five demonstration materials.
- Weight: a finite positive number in kilograms. Reject ambiguous units and values.
- Accept normal CSV quoting, CRLF/LF and UTF-8 BOM. Use a CSV parser rather than
  splitting lines on commas. Escape imported values when rendering HTML.
- Prevent spreadsheet formula execution when exporting text fields.
- Duplicate-looking entries are retained as supplied; no deduplication workflow.
- New imports replace the full dataset after confirmation; they do not append.

`demo-waste-records.csv` is synthetic and contains May–October 2026 data. October
has 84 records, totalling 12,480 kg: paper 4,320, plastic 3,180, cardboard 2,640,
metal 1,560 and glass 780. Existing HTML tables remain illustrative layouts;
tomorrow's implementation renders the actual imported rows.

## Implementation boundary

Use the existing HTML/CSS designs with a small shared JavaScript data module.
Persist the imported dataset in browser storage and restore it across both pages
and reloads. Show a recoverable error if storage is unavailable or full. Provide
an explicit reset to the sample dataset. A small static preview deployment is
enough; the live marketing landing page must remain unchanged.

No new backend, database, authentication or organisation administration is
required for this demo. The existing Cloudflare Workers scaffold is retained
for the later private pilot. Do not upload identifiable or confidential records
to a public demo. Data remains in the importing browser; it is not a shared system.

## Explicitly deferred

Separate Materials and Reporting pages; PDF reports; CSR/compliance reporting;
recycler/destination verification; diversion rates; carbon estimates; targets;
collector payments; multiple organisations; access management; audit trails;
spreadsheet integrations; scheduled imports; duplicate review; editing records.

Materials remain visible inside Overview. The MVP's reporting output is a
filtered CSV of recorded activity, with no claims that material was recycled.

## Build sequence for tomorrow

1. Import/parser and shared data model: sample dataset, validation and replacement.
2. Render Overview: calculated metrics, monthly context and material breakdown.
3. Render Records: month/material filters, totals and CSV export.
4. Add persistence, reset, empty/error states and responsive polish.
5. Verify the complete import → filter → overview → export → reload flow and
   publish a separate demo URL. No Chrome testing unless requested.

## Definition of done

- Importing the supplied sample produces October totals of 12,480 kg and 84 rows.
- Selecting Paper in October shows 4,320 kg and 28 matching rows.
- Overview's material weights sum to its displayed total.
- September totals 11,200 kg; the six-month trend matches the source file.
- An invalid file identifies the problem and leaves the current dataset intact.
- Importing the same file twice replaces the data, without doubling counts.
- An empty filter result shows an honest zero/empty state and no NaN percentages.
- Exported rows and summed weights match the selected filters.
- Navigation and reloading preserve the imported dataset.
- Narrow layouts keep the main controls usable and allow table scrolling.
- The demo is clearly labelled as sample/anonymised data and recorded quantities.

The earlier four-page mockups are retained as design references, outside the
MVP navigation. Today's MVP HTML remains static; the functional build is the
scope above, not work already completed.
