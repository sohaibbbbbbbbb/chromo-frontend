export interface Project {
    id: string;
    prompt: string;
    created_at: string;
}

export interface Palette {
    id: string;
    project_id: string;
    version: number;
    colors: any[];
    created_at: string;
    is_favourite: number;
}
