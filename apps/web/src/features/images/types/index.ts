// Export image types
import { Id } from '~/convex/_generated/dataModel';
import type { ProcessedImage, S3Image, FolderInfo } from '~/types/s3-types';

export type { ProcessedImage, S3Image, FolderInfo };

// Additional image-specific types can be defined here
export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  entityId: Id<"guides"> | Id<"products">;
  entityType: "guide" | "product";
} 