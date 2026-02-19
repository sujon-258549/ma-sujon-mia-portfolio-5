# Creative Section Backend Specification (Updated)

This document outlines the backend requirements to support the dynamic **Creative Section** of the portfolio.

> **UPDATE**: The user requested a separate data model for `items` vs. `header`. This spec reflects that separation.

## 1. Data Models

We require two distinct models/collections: one for the **Section Header** (singleton) and another for **Creative Items** (multiple documents).

### A. Creative Section Header (Singleton)

This stores the configuration for the section itself. It can be part of your existing `DynamicContent` collection with `type: 'creative_header'`.

```typescript
// Interface for the Section Header
export interface CreativeSectionData {
  type: "creative_header"; // Discriminator
  isActive: boolean; // Visibility toggle
  badge: string; // e.g. "Creative Corner"
  badgeIcon: string; // e.g. "fa-solid fa-paintbrush"
  title: string; // e.g. "Featured"
  titleHighlight: string; // e.g. "Creations"
  description: string; // Section description
}
```

### B. Creative Items (Collection)

These should be stored as individual documents in a new `CreativeItems` collection (or similar).

```typescript
// Interface for a single Creative Item
export interface CreativeItem {
  _id: string; // MongoDB ObjectId
  title: string; // Title of the project
  description: string; // Description
  image?: string; // URL to the cover image
  link?: string; // External link to the project
  icon?: string; // FontAwesome class
  order?: number; // For sorting (optional)
  createdAt: Date;
  updatedAt: Date;
}
```

## 2. API Endpoints

### A. Section Header Endpoints

- **GET** `/api/creative/header`
  - **Returns**: The single `CreativeSectionData` object.
  - _Note_: If it doesn't exist, return default values.
- **PUT** `/api/creative/header`
  - **Body**: Partial `CreativeSectionData`.
  - **Action**: Upsert the singleton record.

### B. Creative Items Endpoints

- **GET** `/api/creative/items`
  - **Returns**: Array of `CreativeItem[]`.
  - _Note_: Should be sorted by `createdAt` desc or `order`.
- **POST** `/api/creative/items`
  - **Body**: `Omit<CreativeItem, "_id">`
  - **Action**: Create a new item.
- **PUT** `/api/creative/items/:id`
  - **Body**: Partial fields to update.
  - **Action**: Update the specific item.
- **DELETE** `/api/creative/items/:id`
  - **Action**: Delete the item.

## 3. Mongoose Schema Examples

### Header Schema (DynamicContent)

```javascript
// Existing DynamicContent collection needs to support this payload
{
  type: "creative_header",
  isActive: true,
  badge: "Creative Corner",
  badgeIcon: "fa-solid fa-paintbrush",
  title: "Featured",
  titleHighlight: "Creations",
  description: "..."
}
```

### Item Schema (New Collection: CreativeItems)

```javascript
const CreativeItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const CreativeItem = mongoose.model("CreativeItem", CreativeItemSchema);
```

## 4. Frontend Integration Status

The frontend has been updated to use the following service methods in `src/services/creativeService.ts`:

- `creativeService.getHeader()` -> GET `/api/creative/header`
- `creativeService.updateHeader(data)` -> PUT `/api/creative/header`
- `creativeService.getItems()` -> GET `/api/creative/items`
- `creativeService.createItem(data)` -> POST `/api/creative/items`
- `creativeService.updateItem(id, data)` -> PUT `/api/creative/items/:id`
- `creativeService.deleteItem(id)` -> DELETE `/api/creative/items/:id`

Ensure your backend routes match these signatures.
