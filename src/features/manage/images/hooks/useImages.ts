import { useQuery, useMutation } from 'convex/react';
import { api } from '~/convex/_generated/api';
import { Id } from '~/convex/_generated/dataModel';
import { useState } from 'react';

export function useImages() {
  // Fetch all images
  const images = useQuery(api.images.getAllImages);
  
  // Delete image mutation
  const deleteImageMutation = useMutation(api.images.deleteImage);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  
  // Update image mutation
  const linkImageToEntityMutation = useMutation(api.images.linkImageToEntity);
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  
  // Function to get images by entity - returns a query function
  const getImagesByEntity = (entityType: string, entityId: string) => {
    return useQuery(api.images.getImagesByEntity, { entityType, entityId });
  };
  
  // Delete image function
  const deleteImage = async (imageId: Id<"images">) => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteImageMutation({ imageId });
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete image';
      setDeleteError(errorMsg);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Link image to entity function
  const linkImageToEntity = async (imageId: Id<"images">, entityType: string, entityId: string) => {
    setIsLinking(true);
    setLinkError(null);
    try {
      await linkImageToEntityMutation({ imageId, entityType, entityId });
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to link image to entity';
      setLinkError(errorMsg);
      return false;
    } finally {
      setIsLinking(false);
    }
  };
  
  return {
    images,
    getImagesByEntity,
    deleteImage,
    linkImageToEntity,
    isDeleting,
    deleteError,
    isLinking,
    linkError
  };
} 