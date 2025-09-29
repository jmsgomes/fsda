## Senior & Staff Fullstack Developer Assessment

### Problem Statement

Build a full-stack application that processes and analyzes large-scale municipal sewer inspection data, providing an intelligent interface for infrastructure engineers and city planners to gain insights from inspection records.

### Context

Municipal sewer systems require regular inspection to identify defects, plan maintenance, and prevent failures. Your task is to build a system that can handle historical inspection data and make it accessible through an AI-powered interface.

### Functional Requirements

#### Data Processing

* Support data exploration
* Enable filtering and searching across multiple data dimensions

#### AI-Powered Analysis

* Implement a conversational interface that can answer complex questions about the inspection data
* Support natural language queries

#### User Interface
* Create an intuitive interface for infrastructure professionals
* Display query results

#### Dataset

* The dataset consists of 5 files. Here's an example URL for one file: https://sewerai-public.s3.us-west-2.amazonaws.com/sewer-inspectionspart1.jsonl
* S3 Bucket: sewerai-public
* Files: sewer-inspections-*.jsonl (5 files totaling approximately 5GB)
* You can infer the data structure from examining the files. It’s also pasted
below.
* OpenAI Key you can use: See `.env` file.

### Evaluation Focus

We're assessing your ability to
* Make appropriate architectural decisions
* Balance technical constraints with user needs
* Demonstrate product thinking alongside technical execution
* Write clean, maintainable, production-quality code

### Time Allocation

You have 1 hour 45 minutes. We recommend:
* Initial design and architecture planning
* Core functionality implementation
* Basic UI/UX implementation
* Testing and refinement

### Deliverables
* Working application with setup instructions
* Brief documentation of your design decisions and trade-offs
* Any assumptions or considerations for production deployment

### Additional Notes

* Choose technologies that best fit the problem
* Focus on demonstrating your strongest skills
* We value thoughtful design over feature completeness
* Be prepared to discuss your approach and future enhancements

### Data Structure

The sewer inspection data you'll work with has this structure:

```
interface SewerInspection {
  id: string; // Unique inspection ID
  timestamp_utc: string; // When the inspection happened
    location: {
    city: string;
    state: string;
    street: string;
    upstream_manhole: string; // Starting point
    downstream_manhole: string; // Ending point
  };
  pipe: {
    material: string; // VCP, PVC, etc.
    diameter_in: number; // Pipe diameter in inches
    length_ft: number; // Pipe length in feet
    age_years: number; // How old the pipe is
  };
  defects: Array<{
    code: string; // Defect code (e.g., "CC" for crack)
    description: string; // Human-readable description
    severity: number; // 1-5 scale (5 is worst)
    distance_ft: number; // How far from start
  }>;
  inspection_score: number; // Overall condition score (0-100)
  requires_repair: boolean; // Needs immediate attention?
}
```

## My programming preferences

For a programming language, I want to use TypeScript exclusively. Avoid other programming languages.

IMPORTANT: Follow Google Style Guides whenever applicable

IMPORTANT: Follow Google AIPs

## Project structure

Organize the code under a `t3` folder:

* All packages should go under `t3/packages`.
* The web client (frontend) package should be under `packages/client`.
  * I want to use Angular for the frontend.
* The backend package should be under `packages/server`.
  * Let's use Express.js for the backend.
* Interoperability code (that doesn't belong to the client or server exclusively) should go under `packages/interop`.
  * Use `tRPC` for interoperability.

Feel free to make suggestions.
