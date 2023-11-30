import { Property } from "@/db/models/property";

export interface PropertiesPage {
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
    properties: Property[];
}