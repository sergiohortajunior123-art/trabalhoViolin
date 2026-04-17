import Link from "next/link";
import { Button } from "@/components/ui/button";



export default function TopbarMenu() {
    return (
        
<header className="w-full h-20 flex gap-9 p-8 bg-[#2d4a2d] items-center justify-between">
    <Link href={"/"}>
        <h1 className={"text-3xl w-70 font-extrabold text-[#a8c5a0]"}>Mapa Interativo</h1>
    </Link>
    
    <nav className="flex flex-row items-center gap-7.5">
        <div className="flex gap-6 text-sm text-[#a8c5a0]">
            <Link href={"/novo-pin"}>Adicionar pin</Link>
            <Link href={"/ver-mapa"}>Ver mapa</Link>
        </div>
        <div className="flex gap-6">
            <Link href={"/login"}><Button variant="outline" className="text-[#a8c5a0] border-[#a8c5a0]">Login</Button></Link>
            <Link href={"/signup"}><Button className="text-white bg-[#1a2e1a] hover:bg-[#3d6b3d]">Cadastrar-se</Button></Link>
        </div>
    </nav>
</header>
    )
}