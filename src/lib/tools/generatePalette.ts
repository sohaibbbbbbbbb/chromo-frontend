import { tool } from 'ai'
import { z } from 'zod'
import { supabaseServer } from '@/lib/supabase-server'

export const generatePaletteTool = tool({
    description: 'Generate and store a versioned color palette',
    inputSchema: z.object({
        colors: z.array(
            z.object({
                name: z.string(),
                hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
                role: z.enum(['primary', 'secondary', 'accent', 'background', 'error']),
            })
        ),
    }),
    execute: async ({ colors }, { experimental_context }) => {
        const { projectId } = experimental_context as { projectId: string }
        console.log('Generating palette for project:', projectId)
        const supabase = await supabaseServer()

        // Fetch latest version
        const { data: latest, error } = await supabase
            .from('palettes')
            .select('version')
            .eq('project_id', projectId)
            .order('version', { ascending: false })
            .limit(1)
            .single()

        if (error && error.code !== 'PGRST116')
            throw error

        const nextVersion = (latest?.version ?? 0) + 1

        // Insert new version
        const { error: insertError } = await supabase
            .from('palettes')
            .insert({
                project_id: projectId,
                version: nextVersion,
                colors,
            })

        if (insertError) throw insertError

        return {
            projectId,
            version: nextVersion,
            colors,
        }
    },
})
