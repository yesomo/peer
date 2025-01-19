import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link";

export default function InfoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-screen flex-col p-2">
            <ToggleGroup type="single" className="pl-6">
                <ToggleGroupItem value="all"><Link href="/info" >全部</Link></ToggleGroupItem>
                <ToggleGroupItem value="news"><Link href="/info/news" >新闻</Link></ToggleGroupItem>
                <ToggleGroupItem value="view"><Link href="/info/views" >观点</Link></ToggleGroupItem>
                <ToggleGroupItem value="skill"><Link href="/info/skill" >技术</Link></ToggleGroupItem>
            </ToggleGroup>
          
            {children}
        </main>
    );
}
