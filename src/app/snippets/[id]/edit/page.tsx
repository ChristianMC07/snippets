import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
    const { id } = await props.params;


    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(id) }
    })

    if (!snippet) {
        return notFound();
    }


    return (
        <form className="flex flex-col gap-4">
        </form>
    )
}