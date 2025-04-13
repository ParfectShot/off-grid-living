import { Separator } from "@radix-ui/react-dropdown-menu";
import { Search, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Doc, Id } from "~/convex/_generated/dataModel";
import { useImages } from "../hooks";
import { ImageDetailModal } from "./ImageDetailModal";
import { ImageGrid } from "./ImageGrid";
import { Link } from "@tanstack/react-router";

export function ImageLibrary() {
  const { images, deleteImage, isDeleting, deleteError } = useImages();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<Doc<"images"> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter images based on search term and active tab
  const filteredImages = React.useMemo(() => {
    if (!images) return [];
    
    let filtered = images.filter((image: Doc<"images">) => 
      image.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply tab filters
    if (activeTab === 'unlinked') {
      filtered = filtered.filter((image: Doc<"images">) => !image.entityId);
    } else if (activeTab === 'linked') {
      filtered = filtered.filter((image: Doc<"images">) => !!image.entityId);
    }
    
    return filtered;
  }, [images, searchTerm, activeTab]);
  
  // Handle image selection for modal
  const handleSelectImage = (image: Doc<"images">) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  
  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  
  // Handle image deletion
  const handleDeleteImage = async (imageId: string) => {
    return await deleteImage(imageId as Id<"images">);
  };
  
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Image Library</h1>
          <p className="text-gray-500 mt-1">Manage all images used across the site</p>
        </div>

        <Link to="/dashboard/media/process-images">
          <Button variant="default">
            Process New Images
          </Button>
        </Link>
      </div>
      
      <Separator />
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Images</CardTitle>
              <CardDescription>
                {images ? `${filteredImages.length} of ${images.length} images` : 'Loading images...'}
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search images..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Images</TabsTrigger>
              <TabsTrigger value="unlinked">Unlinked</TabsTrigger>
              <TabsTrigger value="linked">Linked</TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="pt-6">
            <TabsContent value="all" className="m-0">
              <ImageGrid 
                images={filteredImages} 
                onSelectImage={handleSelectImage} 
                isLoading={!images}
              />
            </TabsContent>
            
            <TabsContent value="unlinked" className="m-0">
              <ImageGrid 
                images={filteredImages} 
                onSelectImage={handleSelectImage} 
                isLoading={!images}
              />
            </TabsContent>
            
            <TabsContent value="linked" className="m-0">
              <ImageGrid 
                images={filteredImages} 
                onSelectImage={handleSelectImage} 
                isLoading={!images}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
      
      {/* Error display */}
      {deleteError && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mt-4">
          Error deleting image: {deleteError}
        </div>
      )}
      
      {/* Image detail modal */}
      <ImageDetailModal
        image={selectedImage}
        open={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteImage}
        isDeleting={isDeleting}
      />
    </div>
  );
} 