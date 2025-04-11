import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { createFileRoute, Link } from '@tanstack/react-router';
import ProductManagementTable from '~/features/manage/products/components/ProductManagementTable';
import { GuideManagementTable } from '~/features/manage/guides/components/GuideManagementTable';
import BlogManagementTable from '~/features/manage/blogs/components/BlogManagementTable';
import { GuideEditModal } from '~/features/manage/guides/components/GuideEditModal';
import { Doc } from '~/../convex/_generated/dataModel';
import { Button } from '~/components/ui/button';
import { Library, Image as ImageIcon } from 'lucide-react';

export const Route = createFileRoute("/dashboard/manage/")({
  component: ManageComponent,
});

// This type must match the one expected by GuideEditModalProps['guide']
type GuideForEditing = Pick<Doc<"guides">, '_id' | 'title' | 'slug'>;

function ManageComponent() {
  // Ensure the state holds the correct type
  const [editingGuide, setEditingGuide] = useState<GuideForEditing | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Content</h1>
      <Tabs defaultValue="guides">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>
        <TabsContent value="guides">
          {/* GuideManagementTable's onEdit provides GuideForManagement, which is compatible with GuideForEditing */}
          <GuideManagementTable onEdit={setEditingGuide} />
        </TabsContent>
        <TabsContent value="products">
          <ProductManagementTable />
        </TabsContent>
        <TabsContent value="blogs">
          <BlogManagementTable />
        </TabsContent>
        <TabsContent value="images">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mt-4">
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <ImageIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Image Management</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                Manage all your images, view variants, and assign to content.
              </p>
              <Button asChild>
                <Link to="/dashboard/manage/images/">
                  <Library className="mr-2 h-4 w-4" />
                  Open Image Library
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Pass the correctly typed guide to the modal */}
      {editingGuide && (
        <GuideEditModal
          guide={editingGuide} // Pass the GuideForEditing object
          isOpen={!!editingGuide}
          onClose={() => setEditingGuide(null)}
        />
      )}
    </div>
  );
} 