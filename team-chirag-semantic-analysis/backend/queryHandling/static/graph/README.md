# Graph Nodes JSON Schema

This directory contains the JSON schema and related documentation for representing educational concepts as graph nodes in the Continuous Progressive System (CPS).

## Overview

The graph structure represents educational concepts, their relationships, and learning pathways in a hierarchical format. Each concept can have subconcepts, prerequisites, and suggestions for related topics.

## JSON Schema Structure

### Root Object

The root object contains an array of concepts:

```json
{
  "concepts": [
    // Array of concept objects
  ]
}
```

### Concept Object

Each concept in the graph is represented by the following structure:

#### Core Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✓ | Unique identifier for the concept (e.g., "t1", "t2") |
| `name` | string | ✓ | Human-readable name of the concept |
| `type` | string | ✓ | Type of concept: "topic" or "subtopic" |
| `level` | string | ✓ | Difficulty level: "beginner", "intermediate", "advanced" |
| `description` | string | ✓ | Detailed explanation of the concept |

#### Metadata Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `keywords` | array[string] | ✓ | Array of relevant keywords for search and categorization |
| `prerequisites` | array[string] | ✓ | Array of concept IDs that should be learned before this concept |
| `topic_suggestions` | array[string] | ✓ | Array of concept IDs for related or next topics to explore |

#### Resources Object

The `resources` object contains learning materials:

```json
{
  "resources": {
    "videos": [
      {
        "title": "Video title",
        "url": "https://example.com/video"
      }
    ],
    "articles": [
      {
        "title": "Article title", 
        "url": "https://example.com/article"
      }
    ]
  }
}
```

#### Subconcepts Array

For hierarchical organization, concepts can contain subconcepts:

```json
{
  "subconcepts": [
    // Array of concept objects with the same structure
  ]
}
```

## Example Schema

```json
{
  "concepts": [
    {
      "id": "t1",
      "name": "Array",
      "type": "topic",
      "level": "beginner",
      "description": "An array is a linear data structure that stores elements in contiguous memory locations and allows random access using indices.",
      "keywords": ["array", "linear data structure", "contiguous memory", "indexed access"],
      "prerequisites": [],
      "topic_suggestions": ["t2", "t3"],
      "resources": {
        "videos": [
          {
            "title": "Introduction to Arrays | DSA",
            "url": "https://www.youtube.com/watch?v=ZJKO9fEjHbI"
          }
        ],
        "articles": [
          {
            "title": "Understanding Arrays",
            "url": "https://www.geeksforgeeks.org/arrays-in-c-cpp/"
          }
        ]
      },
      "subconcepts": [
        {
          "id": "t1_s1",
          "name": "Initialization",
          "type": "subtopic",
          "level": "beginner",
          "description": "Ways to declare, initialize, and access elements in an array.",
          "keywords": ["declare array", "initialize", "default values"],
          "prerequisites": [],
          "topic_suggestions": ["t1_s2"],
          "resources": {
            "videos": [
              {
                "title": "How to Initialize Arrays in C++",
                "url": "https://www.youtube.com/watch?v=3CmPvQChZT8"
              }
            ],
            "articles": []
          }
        },
        {
          "id": "t1_s2",
          "name": "Size",
          "type": "subtopic",
          "level": "beginner",
          "description": "Understanding how array size works, memory allocation, and related operations.",
          "keywords": ["array size", "sizeof", "memory layout"],
          "prerequisites": ["t1_s1"],
          "topic_suggestions": [],
          "resources": {
            "videos": [],
            "articles": []
          }
        }
      ]
    }
  ]
}
```

## Validation Rules

### ID Conventions
- Main topics: `t{number}` (e.g., "t1", "t2", "t15")
- Subtopics: `t{parent_number}_s{sub_number}` (e.g., "t1_s1", "t1_s2")
- Sub-subtopics: `t{parent_number}_s{sub_number}_ss{subsub_number}` (e.g., "t1_s1_ss1")

### Type Values
- `"topic"`: Main educational concept
- `"subtopic"`: Sub-concept under a main topic

### Level Values
- `"beginner"`: Introductory level
- `"intermediate"`: Moderate difficulty
- `"advanced"`: High difficulty level

### Prerequisites
- Must reference valid concept IDs that exist in the graph
- Should form a directed acyclic graph (DAG) to avoid circular dependencies
- Empty array `[]` indicates no prerequisites

### Topic Suggestions
- Must reference valid concept IDs
- Used for recommending related or next topics
- Can be empty array `[]`

## Graph Relationships

### Hierarchical Structure
```
Topic (t1)
├── Subtopic (t1_s1)
│   └── Sub-subtopic (t1_s1_ss1)
└── Subtopic (t1_s2)
```

### Prerequisite Dependencies
```
t1 (Array) → t2 (Linked List) → t3 (Stack)
```

### Topic Suggestions (Related Concepts)
```
t1 (Array) ⟷ t2 (Linked List)
t1 (Array) ⟷ t15 (Dynamic Array)
```

## Usage Guidelines

1. **Unique IDs**: Ensure all concept IDs are unique across the entire graph
2. **Valid References**: All prerequisite and suggestion IDs must exist in the graph
3. **Hierarchical Consistency**: Subconcepts should be logically related to their parent
4. **Resource Quality**: Include high-quality, accessible learning resources
5. **Keyword Relevance**: Use keywords that learners would naturally search for
6. **Description Clarity**: Write clear, concise descriptions suitable for the target level

## File Naming Convention

- Main graph file: `concepts_graph.json`
- Subject-specific files: `{subject}_concepts.json` (e.g., `dsa_concepts.json`, `algorithms_concepts.json`)
- Version-specific files: `concepts_v{version}.json` (e.g., `concepts_v1.0.json`)

## Integration Notes

This schema is designed to integrate with:
- Learning recommendation engines
- Progress tracking systems
- Adaptive learning pathways
- Search and discovery features
- Prerequisite validation systems

## Contributing

When adding new concepts:
1. Follow the ID naming conventions
2. Ensure all referenced IDs exist
3. Validate the JSON structure
4. Test prerequisite relationships for cycles
5. Include relevant keywords and quality resources
6. Write clear, level-appropriate descriptions

## Version History

- v1.0: Initial schema design with basic concept structure
- v1.1: Added subconcepts support for hierarchical organization
- v1.2: Enhanced resource structure with videos and articles
- v1.3: Added validation rules and usage guidelines
