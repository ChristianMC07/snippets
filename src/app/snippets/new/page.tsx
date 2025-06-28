import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnippetCreatePage() {

    async function createSnippet(formData: FormData) {
        //make clear to NextJS that this is a server action
        'use server';
        //check user's inputs and validate them
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;
        //create a new record in the DB

        const snippet = await db.snippet.create({
            data: {
                title: title,
                code: code
            }
        })

        console.log(snippet);

        //redirect the user back to the root route
        redirect('/');
    }


    return (
        <form action={createSnippet}>
            <h3 className="font-bold mb-4">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" className="border rounded p-2 w-full" />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="code">Code</label>
                    <input type="textarea" id="code" name="code" className="border rounded p-2 w-full" />
                </div>

                <button type="submit" className="rounded p-2 bg-blue-200">Create</button>
            </div>
        </form>
    )
}