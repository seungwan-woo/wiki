# Wiki Schema

## Domain
AI/ML research: models, architectures, training methods, inference systems, evaluation, alignment, datasets, labs, companies, products, and research trends. The wiki is intended to compound source-grounded knowledge over time, with careful provenance, contradictions, and cross-references.

## Conventions
- File names: lowercase, hyphens, no spaces (e.g., `transformer-architecture.md`).
- Every wiki page starts with YAML frontmatter using the schema below.
- Use `[[wikilinks]]` to link between pages; aim for at least 2 outbound links per page when relevant pages exist.
- When updating a page, always bump the `updated` date.
- Every new page must be added to `index.md` under the correct section.
- Every action must be appended to `log.md`.
- Raw sources under `raw/` are immutable after ingest. Corrections and synthesis belong in wiki pages, not raw files.
- Provenance markers: On pages that synthesize 3+ sources, append `^[raw/articles/source-file.md]` or equivalent at the end of paragraphs whose claims come from a specific source. Optional on single-source pages where the `sources:` frontmatter is enough.
- Confidence: Use `confidence: medium` or `low` for opinion-heavy, fast-moving, or single-source claims. Use `high` only when well-supported across multiple sources.

## Frontmatter

```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | comparison | query | summary
tags: [from taxonomy below]
sources: [raw/articles/source-name.md]
# Optional quality signals:
confidence: high | medium | low
contested: true
contradictions: [other-page-slug]
---
```

## raw/ Frontmatter

Raw sources must include a small frontmatter block so re-ingests can detect drift:

```yaml
---
source_url: https://example.com/article
ingested: YYYY-MM-DD
sha256: <hex digest of the raw content below the frontmatter>
---
```

Compute `sha256` over the body only, not the frontmatter.

## Tag Taxonomy

Every tag used on a page must appear here. Add new tags here before using them.

### Models and architectures
- model
- architecture
- transformer
- multimodal
- diffusion
- agent

### Training and optimization
- training
- fine-tuning
- reinforcement-learning
- optimization
- data
- synthetic-data

### Inference and systems
- inference
- serving
- quantization
- hardware
- systems

### Evaluation and safety
- benchmark
- evaluation
- alignment
- safety
- interpretability
- robustness

### People, organizations, and artifacts
- person
- company
- lab
- open-source
- product
- dataset
- paper

### Meta
- comparison
- timeline
- controversy
- prediction
- survey

## Page Thresholds
- Create a page when an entity/concept appears in 2+ sources OR is central to one source.
- Add to an existing page when a source mentions something already covered.
- Do not create a page for passing mentions, minor details, or things outside the domain.
- Split a page when it exceeds ~200 lines; break into sub-topics with cross-links.
- Archive a page when its content is fully superseded: move to `_archive/`, remove from index, and update inbound links.

## Entity Pages
One page per notable entity. Include:
- Overview / what it is
- Key facts and dates
- Relationships to other entities via `[[wikilinks]]`
- Source references

## Concept Pages
One page per concept or topic. Include:
- Definition / explanation
- Current state of knowledge
- Open questions or debates
- Related concepts via `[[wikilinks]]`

## Comparison Pages
Side-by-side analyses. Include:
- What is being compared and why
- Dimensions of comparison, preferably in table format
- Verdict or synthesis
- Sources

## Query Pages
File substantial answers that would be painful to re-derive. Include:
- Question
- Short answer
- Evidence and synthesis
- Pages consulted
- Open questions / follow-ups

## Update Policy
When new information conflicts with existing content:
1. Check the dates; newer sources generally supersede older ones.
2. If genuinely contradictory, note both positions with dates and sources.
3. Mark the contradiction in frontmatter: `contested: true` and/or `contradictions: [page-name]`.
4. Flag for user review in the lint report.
