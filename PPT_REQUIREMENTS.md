# PPT Requirements Extraction

Source deck: `c:\Users\raash\Downloads\Ai_driven_expansion[1][1][2] (1).pptx`
Review date: `2026-03-17`
Deck size reviewed: `19 slides`

This file records the requirements and project expectations present in the PPT only. It does not add implementation decisions beyond what can be reasonably inferred from the slides. Where the PPT is ambiguous or internally inconsistent, that is called out explicitly so we do not accidentally treat a weak claim as a confirmed requirement.

## Review Method Used

The PPT was reviewed in five passes:

1. Full slide inventory and slide count verification.
2. Slide-by-slide text extraction to capture every visible text block.
3. Re-reading of objectives, abstract, proposed system, and module slides to isolate explicit requirements.
4. Visual review of the non-text-heavy slides, especially the architecture slide and results screenshot slide, to catch anything that plain text extraction could miss.
5. Cross-check pass to separate true requirements from background material such as literature references and presentation boilerplate.

Additional review notes:

- No speaker notes were found in the deck.
- The architecture slide and the second results slide were visually inspected because they contain diagrammatic or screenshot content.

## Executive Understanding

The PPT describes a project whose main goal is to build an AI-driven road monitoring and recommendation system that combines:

- traffic analysis,
- road damage detection,
- carbon emission estimation,
- road expansion recommendation, and
- road maintenance prioritization.

The core technical stack repeatedly named in the PPT is:

- `YOLOv8` for detection,
- `ResNet50` for classification or feature refinement,
- `Deep SORT` for tracking.

The intended output is not just raw detections. The system is expected to convert observed traffic and road-condition data into actionable recommendations for:

- which road segments may need expansion,
- which road segments may need maintenance or repair,
- which road segments are environmentally concerning due to emissions.

## Slide-by-Slide Capture

### Slide 1: Title Slide

Observed content:

- Project title: `AI-DRIVEN ROAD EXPANSION RECOMMENDATION SYSTEM BASED ON VEHICLE TRAFFIC PATTERNS`
- Academic context: `PROJECT PHASE-II`, `REVIEW1`

Requirement value:

- Confirms the project scope is centered on road expansion recommendations driven by vehicle traffic patterns.
- Does not introduce a concrete functional requirement by itself.

### Slide 2: Agenda

Observed content:

- Abstract
- Objective(s)
- Literature Survey
- Inferences from Literature Survey
- Proposed System
- Modules
- Results and Discussion
- References

Requirement value:

- Confirms the project is expected to cover problem framing, objectives, literature grounding, a proposed solution, modules, and results.
- This slide is structure, not implementation detail.

### Slide 3: Abstract

Observed content, converted into requirement meaning:

- The system must address both `traffic congestion` and `road degradation`.
- The system must integrate `computer vision` and `machine learning`.
- The system must analyze `real-time traffic patterns`.
- The system must analyze `road surface conditions`.
- The system should use `YOLOv8` for fast and accurate vehicle and damage detection.
- The system should use `ResNet50` for refined vehicle classification and condition assessment.
- The system should use `Deep SORT` for consistent vehicle tracking across frames.
- The system must support traffic density analysis.
- The system must monitor road damage and recommend timely maintenance actions.
- The system must estimate vehicular carbon emissions using vehicle classes and emission factors.
- The system must support automated, data-backed decisions for road expansion and maintenance prioritization.
- The solution is intended to be `scalable` and `environment-aware`.

### Slide 4: Objective

Observed content, converted into requirement meaning:

- The system must perform `real-time vehicle detection`.
- The system must perform `vehicle classification`.
- The system must perform `vehicle tracking`.
- The system must compute `traffic density`.
- The system must identify `road segments requiring expansion`.
- The system must detect and assess `road damages`, including:
  - potholes,
  - surface degradation.
- The system must support `timely maintenance and repair recommendations`.
- The project is expected to compare the proposed system with existing traffic and road monitoring solutions.
- The comparison dimensions explicitly named are:
  - accuracy,
  - efficiency,
  - sustainability.
- The project is expected to demonstrate:
  - improved detection performance,
  - better maintenance planning,
  - more reliable vehicular carbon emission estimation,
  - support for greener infrastructure development.

### Slide 5: Literature Survey (1/5)

Observed content:

- Prior work on traffic flow prediction and road network optimization using graph convolutional networks.
- Prior work on reinforcement learning for urban road expansion planning.
- Reported limitations include performance drop in dynamic traffic and high training cost.

Requirement value:

- This slide is background, not a direct project requirement.
- Indirect requirement extracted from the literature gaps:
  - the project should work better than approaches that struggle in dynamic traffic conditions,
  - the project should avoid becoming impractically expensive to train or run.

### Slide 6: Literature Survey (2/5)

Observed content:

- Prior work on CNN-based traffic density estimation.
- Prior work on multi-modal traffic sensing for expansion recommendation.
- Reported limitations include poor generalization and weakness in low-light or adverse weather conditions.

Requirement value:

- Background, not a direct implementation requirement.
- Indirect project expectations:
  - traffic-density estimation should generalize reasonably,
  - robustness across varying road environments matters,
  - limitations from low-light and weather should be kept in mind even though the PPT does not state a concrete mitigation strategy.

### Slide 7: Literature Survey (3/5)

Observed content:

- Prior work on hybrid ML for future bottleneck prediction.
- Prior work on Poisson models plus neural networks for smart infrastructure design.
- Reported limitations include dataset-merging difficulty and poor scaling to metropolitan-wide simulation.

Requirement value:

- Background, not a direct implementation requirement.
- Indirect expectation:
  - the project should favor a practical and scalable design,
  - the project should be careful about data integration quality.

### Slide 8: Literature Survey (4/5)

Observed content:

- One cited work is on VANET jamming attack detection.
- One cited work is on smart parking management via sensor fusion and HD maps.
- Both are acknowledged as limited for general road expansion planning.

Requirement value:

- These papers are contextual references only.
- Indirect expectation:
  - the proposed project should stay focused on road infrastructure analysis rather than drifting into unrelated smart-city subdomains such as VANET security or parking-only optimization.

### Slide 9: Literature Survey (5/5)

Observed content:

- One cited work surveys EV sustainability and AI-driven operation.
- One cited work studies AI-driven cloud intrusion detection.
- Both are acknowledged as not directly solving road expansion planning.

Requirement value:

- Background, not a direct implementation requirement.
- Indirect expectation:
  - sustainability matters,
  - cybersecurity/cloud references do not define the core project scope.

### Slide 10: Inference from Literature Survey

Observed content, converted into requirement meaning:

- The system should integrate `real-time road surface assessment`.
- The system should combine `traffic analytics` and `road condition analytics` in one framework.
- The system should not treat traffic management and road maintenance as fully separate problems.
- The system should combine object detection with a deeper feature extractor to improve classification quality.
- The system should include `emission estimation` as part of infrastructure planning.
- The system should account for `carbon footprint` in sustainable urban planning decisions.

This is one of the strongest requirement-bearing slides in the deck because it states what is missing from prior work and therefore what the project intends to provide.

### Slide 11: Proposed System

Observed content, converted into requirement meaning:

- The system must accept `real-time or recorded traffic surveillance footage`.
- The system must extract frames from input footage.
- The system must preprocess frames for better inference quality.
- `YOLOv8` must detect:
  - cars,
  - buses,
  - trucks,
  - motorcycles,
  - road defects.
- `ResNet50` must be integrated for deeper vehicle feature extraction and more accurate classification.
- `Deep SORT` must track each detected vehicle across consecutive frames.
- The tracking logic must prevent `double-counting`.
- The system must calculate:
  - vehicle flow,
  - traffic density metrics.
- Roads with consistently high congestion must be flagged for `expansion recommendations`.

### Slide 12: Proposed System

Observed content, converted into requirement meaning:

- The system must detect road surface issues such as:
  - potholes,
  - cracks.
- The system must analyze damage over time.
- The system must record:
  - severity of damage,
  - frequency of damage.
- Road segments with persistent or worsening damage must be prioritized for maintenance or repair.
- The system must estimate carbon emissions based on classified vehicle type.
- The system must use predefined average `CO2 emission rates per kilometer` for supported vehicle types.
- The system must estimate distance using tracking duration and approximate speed.
- The system must calculate total emissions per road segment.
- The system must identify environmental hotspots using emissions data.

### Slide 13: Architecture

Observed content from visual review:

- `Video input`
- `Yolo and Resnet vehicle detection`
- `Vehicle counting`
- `Count the type of vehicle`
- `Detect potholes`
- `Detect carbon emission based on vehicle type`
- `Intelligence - management`

Requirement value:

- Confirms the intended high-level processing flow:
  - ingest video,
  - detect vehicles,
  - count vehicles,
  - classify vehicle types,
  - detect potholes,
  - estimate emissions,
  - feed outputs into a decision or management layer.
- Confirms the project is expected to go beyond vision inference and reach a decision-support stage.

Important note:

- The exact arrow flow on this slide is not perfectly precise, so it should be treated as conceptual architecture, not a finalized system design.

### Slide 14: Modules

Observed content, converted into requirement meaning:

- The project expects a `Data Collection` module.
- The project expects a `Data Cleaning` module.
- The project expects a `Data Transformation` module.
- The project expects a `Data Splitting` module.

Detailed sub-requirements named on this slide:

- Data collection should gather and store data from sources such as:
  - web scraping,
  - APIs,
  - databases,
  - other sources.
- Data cleaning should handle:
  - missing values,
  - outlier removal,
  - inconsistent data correction.
- Data transformation should include:
  - normalization or standardization,
  - categorical encoding,
  - imbalanced data handling,
  - data augmentation.
- Data splitting should divide data into:
  - training set,
  - validation set,
  - test set.

Important note:

- This modules slide is broader and more generic than the video-analysis slides.
- It likely describes the data-preparation and training pipeline rather than only the live inference pipeline.
- The PPT does not explain how `web scraping`, `APIs`, or `databases` connect to the earlier video-surveillance input. This is a real ambiguity and should be clarified later.

### Slide 15: Results and Discussion

Observed content:

- YOLOv8 vehicle detection accuracy claim: `92%`
- ResNet50 vehicle classification accuracy claim: `89%`
- Claimed real-time classification across cars, trucks, and motorcycles.

Requirement value:

- This slide is results-oriented, not a pure requirement slide.
- It does suggest the project expects:
  - measurable evaluation,
  - vehicle detection accuracy reporting,
  - vehicle classification accuracy reporting,
  - real-time capability or near-real-time capability.

### Slide 16: Results and Discussion

Observed content from visual review:

- Screenshot of model-training or validation logs.
- Visible classes include:
  - Ambulance,
  - Bus,
  - Car,
  - Motorcycle,
  - Truck.
- Visible metrics include low `mAP50` and `mAP50-95` values on a small run, and the screenshot appears to show `1 epoch`.

Requirement value:

- This is not a clean requirement slide.
- It does indicate the project may have used a dataset with an `Ambulance` class, which is not clearly listed in the proposed system slides.
- It also suggests that training and evaluation artifacts are expected to exist.

Important inconsistency:

- The screenshot on this slide appears inconsistent with the stronger accuracy claims on Slide 15.
- Because of this, the results in the PPT should not be treated as final acceptance criteria without confirmation.

### Slide 17: References

Observed content:

- Reference list for earlier literature survey entries.

Requirement value:

- No direct project requirement.

### Slide 18: References

Observed content:

- Additional reference list.

Requirement value:

- No direct project requirement.

### Slide 19: Thank You

Observed content:

- Closing slide.

Requirement value:

- No direct project requirement.

## Consolidated Requirements

This section converts the whole PPT into a practical requirement set that we can use later when implementation begins.

### Functional Requirements

- `FR-01` The system must ingest traffic surveillance video, either real-time or recorded.
- `FR-02` The system must extract and preprocess frames before inference.
- `FR-03` The system must detect vehicles from input footage.
- `FR-04` The system must support vehicle classes explicitly named in the PPT: car, bus, truck, motorcycle.
- `FR-05` The system likely needs to support ambulance as well, but this is ambiguous because it appears only in the results screenshot.
- `FR-06` The system must detect road defects or road surface issues.
- `FR-07` The system must detect potholes.
- `FR-08` The system should detect cracks and broader surface degradation.
- `FR-09` The system must use `YOLOv8` for fast object detection.
- `FR-10` The system must use `ResNet50` for vehicle classification or feature refinement.
- `FR-11` The system must use `Deep SORT` for multi-frame vehicle tracking.
- `FR-12` The tracking pipeline must avoid double-counting vehicles.
- `FR-13` The system must count vehicles.
- `FR-14` The system must classify vehicle type.
- `FR-15` The system must compute traffic density metrics.
- `FR-16` The system must compute vehicle flow metrics.
- `FR-17` The system must identify road segments with persistent congestion.
- `FR-18` The system must recommend road expansion for segments with consistently high congestion.
- `FR-19` The system must monitor road damage over time.
- `FR-20` The system must record damage severity.
- `FR-21` The system must record damage frequency.
- `FR-22` The system must prioritize persistent or worsening segments for maintenance or repair.
- `FR-23` The system must estimate carbon emissions based on vehicle type.
- `FR-24` The system must use predefined emission factors per kilometer for supported vehicle classes.
- `FR-25` The system must estimate travel distance using tracking duration and approximate speed.
- `FR-26` The system must compute emissions per road segment.
- `FR-27` The system must identify environmental hotspots.
- `FR-28` The system must combine traffic analysis and road-condition analysis in one framework.
- `FR-29` The system must produce decision-support outputs for infrastructure management.
- `FR-30` The system must provide both road expansion and road maintenance recommendations.

### Data and Pipeline Requirements

- `DR-01` The project must include a data collection stage.
- `DR-02` The project must include data storage as part of collection.
- `DR-03` The project must include data cleaning for missing values.
- `DR-04` The project must include outlier handling or removal.
- `DR-05` The project must correct inconsistent data.
- `DR-06` The project must include data transformation.
- `DR-07` The project should support normalization or standardization where needed.
- `DR-08` The project should support categorical encoding where needed.
- `DR-09` The project should address imbalanced data.
- `DR-10` The project should include data augmentation where useful.
- `DR-11` The project must split data into training, validation, and test sets.
- `DR-12` The project must support a model-training and evaluation workflow in addition to runtime inference.

### Output Requirements

- `OR-01` The system must output vehicle detection results.
- `OR-02` The system must output vehicle counts.
- `OR-03` The system must output vehicle-type counts.
- `OR-04` The system must output traffic density or congestion indicators.
- `OR-05` The system must output road damage findings.
- `OR-06` The system must output maintenance or repair priorities.
- `OR-07` The system must output road expansion recommendations.
- `OR-08` The system must output carbon emission estimates.
- `OR-09` The system must output per-road-segment environmental hotspot indicators.
- `OR-10` The system must produce management-oriented or intelligence-oriented recommendations, not only raw model predictions.

### Evaluation and Comparison Requirements

- `ER-01` The project must evaluate vehicle detection performance.
- `ER-02` The project must evaluate vehicle classification performance.
- `ER-03` The project should demonstrate real-time or near-real-time usefulness.
- `ER-04` The project must compare the proposed system with existing traffic and road monitoring solutions.
- `ER-05` The comparison should cover accuracy, efficiency, and sustainability.
- `ER-06` The project is expected to show improved maintenance planning and improved emission estimation versus existing approaches, although the PPT does not define the exact benchmark method.

### Non-Functional Expectations

- `NFR-01` The solution should operate on real-time or near-real-time traffic footage.
- `NFR-02` The solution should be scalable.
- `NFR-03` The solution should be environment-aware.
- `NFR-04` The solution should support sustainable urban planning.
- `NFR-05` The solution should improve road safety and road durability through timely maintenance recommendations.
- `NFR-06` The solution should provide reliable enough detection, tracking, and classification to support planning decisions.

## Requirements That Appear Strongest in the PPT

These are the requirements most directly and repeatedly supported by the deck and therefore should be treated as highest-confidence requirements:

- Use `YOLOv8`, `ResNet50`, and `Deep SORT`.
- Accept traffic video input.
- Detect and classify vehicles.
- Track vehicles across frames.
- Count vehicles without double-counting.
- Compute traffic density and vehicle flow.
- Detect road damage such as potholes and cracks.
- Track damage severity and frequency over time.
- Recommend road expansion for heavily congested segments.
- Recommend maintenance for persistently damaged segments.
- Estimate carbon emissions by vehicle type.
- Produce integrated decision support instead of isolated detection outputs.

## Items That Are Mentioned but Need Clarification Later

- `CL-01` Whether ambulance is a required vehicle class or only part of one experimental dataset.
- `CL-02` Whether `ResNet50` classifies only vehicle type or also road-condition state.
- `CL-03` Whether road defect detection is entirely handled by `YOLOv8` or partly by another model not named in the PPT.
- `CL-04` Whether the project must process only video input or also non-video data sources from web scraping, APIs, and databases.
- `CL-05` Whether expansion recommendation means:
  - a binary flag,
  - a ranked priority list,
  - a lane-expansion suggestion,
  - a segment-level recommendation score.
- `CL-06` How approximate speed and distance are expected to be estimated from the tracking pipeline.
- `CL-07` What exact formula or thresholds define `high congestion`, `persistent damage`, and `environmental hotspot`.
- `CL-08` What exact metrics and baselines are required for the comparison with existing systems.
- `CL-09` Whether the system must use only recorded CCTV-style footage or also live feeds in deployment.

## Internal Inconsistencies or Risks Found in the PPT

- `RISK-01` Slide 15 claims `92%` YOLOv8 detection accuracy and `89%` ResNet50 classification accuracy, but Slide 16 shows a training or validation screenshot with much weaker metrics such as low `mAP50` and `mAP50-95`.
- `RISK-02` Slide 11 names vehicle classes `cars, buses, trucks, motorcycles`, while Slide 16 visibly includes `Ambulance` as an evaluated class.
- `RISK-03` Slide 14 introduces broad data-source ideas such as web scraping, APIs, and databases, but Slides 11 to 13 primarily describe a surveillance-video pipeline. The connection is not defined.
- `RISK-04` The architecture slide is conceptually useful but not precise enough to be treated as a final low-level system design.

## What Should Not Be Mistaken for Requirements

- The literature survey paper titles are references, not implementation tasks.
- The reference slides are bibliographic support, not system requirements.
- The academic title slide and agenda slide are presentation structure, not feature requirements.
- Reported results should not be treated as final acceptance thresholds unless explicitly re-confirmed later.

## Recommended Working Baseline for Future Implementation

If we later begin implementation, this PPT should be treated as requiring at least the following minimum scope:

- a video-based traffic analysis pipeline,
- vehicle detection, classification, and tracking,
- road defect detection,
- congestion-based expansion recommendation,
- damage-based maintenance recommendation,
- vehicle-type-based carbon emission estimation,
- basic data preparation and train/validation/test workflow,
- measurable evaluation and comparison with prior approaches.

## Final Requirement Summary

The PPT most clearly defines a unified AI system that analyzes traffic videos to detect vehicles and road defects, tracks vehicles to compute congestion, estimates emissions by vehicle type, and turns those signals into road expansion and maintenance recommendations. The most explicit technical requirements are the use of `YOLOv8`, `ResNet50`, and `Deep SORT`, together with traffic-density analysis, pothole or road-damage detection, and decision support for smart and sustainable infrastructure planning.
