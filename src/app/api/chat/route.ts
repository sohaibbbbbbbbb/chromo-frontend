import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, stepCountIs } from "ai";
import { supabaseServer } from "@/lib/supabase-server";
import { CHAT_SYSTEM_PROMPT } from "@/constants/prompts";
import { generatePaletteTool } from "@/lib/tools/generatePalette";

export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return new Response("Unauthorized", { status: 401 });

  const { projectId } = await req.json();

  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("content, role")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  if (messagesError || !messages)
    return new Response("Failed to fetch messages", { status: 500 });

  const anthropic = createAnthropic({
    apiKey: process.env.NEXT_PUBLIC_ANTH_KEY,
  });

  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20250929"),
    system: CHAT_SYSTEM_PROMPT,
    tools: { generatePaletteTool },
    messages,
    experimental_context: { projectId },
  });

  return result.toTextStreamResponse();
}
