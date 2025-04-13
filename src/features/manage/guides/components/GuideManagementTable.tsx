import React, { useState } from 'react';
import { usePaginatedQuery, useMutation } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Doc, Id } from '~/../convex/_generated/dataModel';
import { GuideCreateModal } from './GuideCreateModal';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

const ITEMS_PER_PAGE = 10;

// Define a more specific type for the guide data expected by the management table
type GuideForManagement = Pick<Doc<"guides">, '_id' | 'title' | 'slug' | 'featured' | 'lastUpdated'>;

type GuideManagementTableProps = {
  onEdit: (guide: GuideForManagement) => void;
};

export function GuideManagementTable({ onEdit }: GuideManagementTableProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [guideToDelete, setGuideToDelete] = useState<GuideForManagement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { results: guides, status, loadMore } = usePaginatedQuery(
    api.guides.listGuidesForManagement,
    {},
    { initialNumItems: ITEMS_PER_PAGE }
  );

  const deleteGuide = useMutation(api.guides.deleteGuide);

  const handleCreate = () => setIsCreateModalOpen(true);
  
  const handleDelete = async (guide: GuideForManagement) => {
    setGuideToDelete(guide);
  };

  const confirmDelete = async () => {
    if (!guideToDelete) return;

    setIsDeleting(true);
    try {
      await deleteGuide({ guideId: guideToDelete._id });
      toast.success('Guide deleted successfully');
    } catch (error) {
      console.error('Failed to delete guide:', error);
      toast.error('Failed to delete guide');
    } finally {
      setIsDeleting(false);
      setGuideToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Guides</CardTitle>
          <Button onClick={handleCreate}>Create New Guide</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {status === "LoadingFirstPage" && (
                <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>
              )}
              {guides?.map((guide) => (
                <TableRow key={guide._id}>
                  <TableCell>{guide.title}</TableCell>
                  <TableCell>{guide.slug}</TableCell>
                  <TableCell>{guide.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{guide.lastUpdated ? new Date(guide.lastUpdated).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => onEdit(guide as GuideForManagement)} className="mr-2">Edit</Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDelete(guide as GuideForManagement)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {guides?.length === 0 && status !== "LoadingFirstPage" && (
                <TableRow><TableCell colSpan={5}>No guides found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
          {(status === "CanLoadMore" || status === "LoadingMore") && (
            <div className="text-center mt-4">
              <Button onClick={() => loadMore(ITEMS_PER_PAGE)} disabled={status === "LoadingMore"}>
                {status === "LoadingMore" ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <GuideCreateModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <AlertDialog open={!!guideToDelete} onOpenChange={(open) => !open && setGuideToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the guide "{guideToDelete?.title}" and all its associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Guide"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 