'use server'

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editSnippet(id:number, code:string ){
    await db.snippet.update({
        where: {id:id},
        data:{code:code}
    })
    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id:number){
    await db.snippet.delete({
        where: {id:id}
    })

    revalidatePath('/');
    redirect('/');
}

export async function createSnippet(formState: { message: string }, formData: FormData) {
    try {
        const title = formData.get('title');
        const code = formData.get('code');

        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: 'Title must be longer'
            };
        }
        if (typeof code !== 'string' || code.length < 10) {
            return {
                message: 'Code must be longer'
            };
        }

        // create a new record in the DB
        await db.snippet.create({
            data: {
                title: title,
                code: code
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                message: error.message
            };
        } else {
            return {
                message: 'Something went wrong'
            };
        }
    }
    revalidatePath('/');
    redirect('/');
}