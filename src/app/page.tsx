import Link from "next/link";
import { db } from "@/db";

export default async function Home() {

  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (

      <Link
        className="flex justify-between items-center p-2 border rounded"
        key={snippet.id}
        href={`/snippets/${snippet.id}`}>
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>


    )
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="rounded p-2 bg-blue-600">New Snippet</Link>
      </div>
      <div className="flex flex-col gap-4">
        {renderedSnippets}
      </div>
    </div>
  );
}
