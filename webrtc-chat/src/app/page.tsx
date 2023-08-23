'use client'

import { useRouter } from "next/navigation";

 
export default function Page() {

  const router = useRouter();
  
  let isAuthed: boolean = false;
  const path = isAuthed ? '/dashboard' : '/login'
  

  return(
    <>
      {router.push(path)}
    </>
  )
}