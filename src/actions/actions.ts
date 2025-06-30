'use server'

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id:number, code:string ){
    await db.snippet.update({
        where: {id:id},
        data:{code:code}
    })
    redirect(`/snippets/${id}`);
}