import React from 'react';
import { usePaginatedQuery } from "convex/react";
import { api } from "~/../convex/_generated/api";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Doc, Id } from '~/../convex/_generated/dataModel'; // Import Id as well

const ITEMS_PER_PAGE = 10;

// Define a more specific type for the guide data expected by the management table
type GuideForManagement = Pick<Doc<"guides">, '_id' | 'title' | 'slug' | 'featured' | 'lastUpdated'>;

type GuideManagementTableProps = {
  // Ensure the onEdit prop expects the correct type
  onEdit: (guide: GuideForManagement) => void;
};

// Use GuideForManagement where appropriate
export function GuideManagementTable({ onEdit }: GuideManagementTableProps) {
  const { results: guides, status, loadMore } = usePaginatedQuery(
    api.guides.listGuidesForManagement, // This query returns specific fields
    {},
    { initialNumItems: ITEMS_PER_PAGE }
  );

  const handleCreate = () => console.log("Create Guide");
  // Update the handleDelete signature if needed, assuming ID is sufficient
  const handleDelete = (id: Id<"guides">) => console.log("Delete Guide:", id);

  return (
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
            {/* Ensure the guide object passed to onEdit matches GuideForManagement */}
            {guides?.map((guide) => (
              <TableRow key={guide._id}>
                <TableCell>{guide.title}</TableCell>
                <TableCell>{guide.slug}</TableCell>
                <TableCell>{guide.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell>{guide.lastUpdated ? new Date(guide.lastUpdated).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  {/* Cast might be unnecessary if listGuidesForManagement returns GuideForManagement type */}
                  <Button variant="outline" size="sm" onClick={() => onEdit(guide as GuideForManagement)} className="mr-2">Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(guide._id)}>Delete</Button>
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
  );
} 