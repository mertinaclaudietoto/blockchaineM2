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
            <Hero></Hero>
            <LiveAuctions></LiveAuctions>
            <TopSeller></TopSeller>
            <TodaysPicks></TodaysPicks>
            <PopularCollection></PopularCollection>
            <CreateAndSell></CreateAndSell>
            <Footer></Footer>
        </div>
    )
}


