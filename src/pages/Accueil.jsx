import { CreateAndSell } from "../shared/public/CreateAndSell"
import { Footer } from "../shared/public/Footer"
import { Header } from "../shared/public/Header"
import { Hero } from "../shared/public/Hero"
import { LiveAuctions } from "../shared/public/LiveAuctions"
import { PopularCollection } from "../shared/public/PopularCollection"
import { TodaysPicks } from "../shared/public/TodaysPicks"
import { TopSeller } from "../shared/public/TopSeller"
export function Accueil(){
    return (
        <div style={{ backgroundColor: "var(--color-background)" }}>
            <Header></Header>
            <div id="hero" className="scroll-mt-20">
                <Hero></Hero>
            </div>
            <div id="utilisateurs" className="scroll-mt-20">
                <TopSeller></TopSeller>
            </div>
            <div id="creation" className="scroll-mt-20">
                <CreateAndSell></CreateAndSell>
            </div>
            {/* <LiveAuctions></LiveAuctions> */}
           
            <div id="ventes" className="scroll-mt-20">
                <TodaysPicks></TodaysPicks>
            </div>
            {/* <PopularCollection></PopularCollection> */}
            
            {/* <Footer></Footer> */}
        </div>
    )
}


