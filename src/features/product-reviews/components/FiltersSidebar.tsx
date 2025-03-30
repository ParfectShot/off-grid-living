import React from "react";
import { Search, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";

// TODO: Define props for filters state and callbacks
interface FiltersSidebarProps {
    // Example:
    // initialFilters: FilterStateType;
    // onApplyFilters: (filters: FilterStateType) => void;
    // onClearFilters: () => void;
    currencySymbol?: string;
    currencyCode?: string;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ currencySymbol = '₹', currencyCode = 'INR' }) => {
    // TODO: Implement state management for filter values

    return (
        <aside className="border-r pr-6 space-y-6">
            <h2 className="text-lg font-semibold">Filters</h2>

            {/* Search */}
            <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-medium">
                    Search Reviews
                </label>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="search" placeholder="Search..." className="pl-8" />
                </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                    Category
                </label>
                {/* TODO: Populate categories dynamically */}
                <Select>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="solar-panels">Solar Panels</SelectItem>
                        <SelectItem value="inverters">Inverters</SelectItem>
                        <SelectItem value="batteries">Batteries</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Rating Filter (Commented out as requested) */}
            {/* <div className="space-y-2">
               <label className="text-sm font-medium">Rating</label>
               <div className="flex flex-col space-y-1">
                 {[5, 4, 3, 2, 1].map((rating) => (
                   <label key={rating} className="flex items-center space-x-2">
                     <Checkbox id={`rating-${rating}`} />
                     <div className="flex items-center">
                       {[...Array(rating)].map((_, i) => (
                         <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                       ))}
                       {[...Array(5 - rating)].map((_, i) => (
                         <Star key={i} className="h-4 w-4 fill-muted stroke-muted-foreground" />
                       ))}
                        <span className="text-sm ml-1"> & Up</span>
                     </div>
                   </label>
                 ))}
               </div>
             </div> */}

            {/* Price Range Filter */}
            <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                    Price Range ({currencyCode})
                </label>
                {/* TODO: Make min/max dynamic? */}
                <Slider
                    id="price"
                    min={0}
                    max={500000}
                    step={1000}
                    defaultValue={[0, 500000]}
                    className="py-2"
                // TODO: Add value and onValueChange props
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currencySymbol}0</span>
                    <span>{currencySymbol}500,000+</span>
                </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                {/* TODO: Populate brands dynamically */}
                <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto">
                    {["WAAREE", "Luminous", "Tata Power", "Exide", "Havells"].map((brand) => (
                        <label key={brand} className="flex items-center space-x-2">
                            <Checkbox id={`brand-${brand}`} />
                            <span className="text-sm">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            <Separator />
            {/* TODO: Wire up filter application/clearing */}
            <Button className="w-full">Apply Filters</Button>
            <Button variant="outline" className="w-full">Clear Filters</Button>
        </aside>
    );
}; 