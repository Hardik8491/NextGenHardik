import { Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className='w-full h-screen flex items-center gap-4 flex-col justify-center'>
            <h2 className='text-9xl font-bold font-Poppins '>404</h2>
            <h2 className='text-4xl  font-bold font-Poppins '>NOT FOUND</h2>

            <Link href='/'>
                <Button className="border border-l-gray-400" >Return Home</Button>
            </Link>
        </div>
    );
}
