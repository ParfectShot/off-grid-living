import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ProcessedImage } from "~/lib/services/image-service";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface EntityOption {
  id: string;
  name: string;
  type: string;
}

interface ImageEntityMapperProps {
  images: ProcessedImage[];
}

export function ImageEntityMapper({ images }: ImageEntityMapperProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [entityType, setEntityType] = useState<"guide" | "product">("guide");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch entity options from Convex
  const guides = useQuery(api.guides.getAll) || [];
  const products = useQuery(api.products.getAll) || [];

  // Map entities to a common format
  const guideOptions: EntityOption[] = guides.map(guide => ({
    id: guide._id,
    name: guide.title,
    type: 'guide',
  }));

  const productOptions: EntityOption[] = products.map(product => ({
    id: product._id,
    name: product.name,
    type: 'product',
  }));

  // Filter options based on entity type and search term
  const entityOptions = entityType === "guide" ? guideOptions : productOptions;
  const filteredOptions = entityOptions.filter(option => 
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mutation for linking image to entity
  const linkImage = useMutation(api.images.linkImageToEntity);

  const handleLinkImage = async () => {
    if (!selectedImage || !selectedEntity) {
      toast.error("Please select both an image and an entity");
      return;
    }

    try {
      await linkImage({ 
        imageId: selectedImage, 
        entityId: selectedEntity,
        entityType
      });
      toast.success(`Image linked to ${entityType} successfully`);
      setSelectedImage(null);
      setSelectedEntity(null);
    } catch (error) {
      toast.error("Failed to link image to entity");
      console.error(error);
    }
  };

  // Filter images that haven't been linked to entities yet
  const unlinkedImages = images.filter(image => !image.entityId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Images to Entities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {unlinkedImages.length === 0 ? (
          <div className="text-center py-6 border rounded-lg bg-gray-50">
            <p className="text-gray-500">No unlinked images available</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image-select">Select Image</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {unlinkedImages.map((image) => (
                  <div 
                    key={image.id} 
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                      selectedImage === image.id ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <div className="aspect-square">
                      <img
                        src={image.originalUrl}
                        alt={image.originalName}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all" />
                    <div className="p-2 bg-white">
                      <p className="text-xs font-medium truncate">{image.originalName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entity-type">Entity Type</Label>
                <Select value={entityType} onValueChange={(val: "guide" | "product") => setEntityType(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="entity-search">Search {entityType === "guide" ? "Guides" : "Products"}</Label>
                <Input
                  id="entity-search"
                  placeholder={`Search ${entityType === "guide" ? "guides" : "products"}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entity-select">Select {entityType === "guide" ? "Guide" : "Product"}</Label>
                {filteredOptions.length === 0 ? (
                  <div className="text-center py-3 border rounded-lg bg-gray-50">
                    <p className="text-gray-500">No {entityType === "guide" ? "guides" : "products"} found</p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="max-h-60 overflow-y-auto">
                      {filteredOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`p-3 cursor-pointer hover:bg-gray-50 ${
                            selectedEntity === option.id ? 'bg-primary/10' : ''
                          }`}
                          onClick={() => setSelectedEntity(option.id)}
                        >
                          <p className="font-medium">{option.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={handleLinkImage} 
              disabled={!selectedImage || !selectedEntity}
              className="w-full"
            >
              Link Image to {entityType === "guide" ? "Guide" : "Product"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 