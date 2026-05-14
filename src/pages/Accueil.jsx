import { Header } from "../shared/public/Header"
import { Hero } from "../shared/public/Hero"
import { LiveAuctions } from "../shared/public/LiveAuctions"
export function Accueil(){
    return (
        <>
            <Header></Header>
            <Hero></Hero>
            <LiveAuctions></LiveAuctions>
        </>
    )
}


git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mertinaclaudietoto/blockchaineM2.git
git push -u origin main