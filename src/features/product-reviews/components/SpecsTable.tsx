import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Doc } from '~/convex/_generated/dataModel';

interface SpecsTableProps {
    brand?: Doc<"brands"> | null;
    categories?: Doc<"productCategories">[];
    specs?: Doc<"productSpecs">[];
    attributes?: Doc<"productAttributes">[];
}

export const SpecsTable: React.FC<SpecsTableProps> = ({ brand, categories = [], specs = [], attributes = [] }) => {
    const hasSpecs = brand || categories.length > 0 || specs.length > 0 || attributes.length > 0;

    if (!hasSpecs) {
        return <p className="text-muted-foreground">No specifications available.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px] md:w-[200px]">Specification</TableHead>
                    <TableHead>Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Display Brand */}
                {brand?.name && (
                    <TableRow>
                        <TableCell className="font-medium">Brand</TableCell>
                        <TableCell>{brand.name}</TableCell>
                    </TableRow>
                )}
                {/* Display Categories */}
                {categories.length > 0 && (
                    <TableRow>
                        <TableCell className="font-medium">Categories</TableCell>
                        <TableCell>{categories.map(cat => cat.name).join(', ')}</TableCell>
                    </TableRow>
                )}
                {/* Display Specs */}
                {specs.map((spec) => (
                    <TableRow key={spec._id}>
                        <TableCell className="font-medium capitalize">{spec.name?.replace(/_/g, ' ')}</TableCell>
                        <TableCell>{spec.value}</TableCell>
                    </TableRow>
                ))}
                {/* Display Attributes */}
                {attributes.map((attr) => (
                    <TableRow key={attr._id}>
                        <TableCell className="font-medium capitalize">{attr.name?.replace(/_/g, ' ')}</TableCell>
                        <TableCell>{attr.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}; 