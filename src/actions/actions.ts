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

export async function deleteSnippet(id:number){
    await db.snippet.delete({
        where: {id:id}
    })
    redirect('/');
}

export async function createSnippet(formState:{message:string}, formData: FormData) {
   
    const title = formData.get('title');
    const code = formData.get('code');

    if(typeof title !== 'string' || title.length<3){
        return{
            message: 'Title must be longer'
        }
    }
    if(typeof code !=='string' || code.length<10 ){
        return {
            message:'Code must be longer'
        }
    }
    
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