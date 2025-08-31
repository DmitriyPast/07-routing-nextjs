import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NotesClient from "./Notes.client"
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: Props) {
    // const perPage = 12;
    // const page = 1;
    // const search = "";
    const qc: QueryClient = new QueryClient()
    let qf = () => fetchNotes(search, initPage, perPage);

    const { slug } = await params;
    const qp = {
        name: "notes",
        search: "",
        initPage: 1,
        perPage: 12,
        tag: slug[0] === "All" ? undefined : slug[0]
    };
    const { name, search, initPage, perPage, tag } = qp
    const qk = [search, initPage, perPage];

    console.log(slug);
    if (slug[0] && slug[0] !== "All") {
        qk.push(slug[0])
        qf = () => fetchNotes(search, initPage, perPage, tag);
    }

    // const data: FetchNotesResponse = await fetchNotes(search, page, perPage)
    await qc.prefetchQuery({
        queryKey: [name, search, initPage, tag],
        queryFn: () => fetchNotes(search, initPage, perPage, tag)
    })
    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NotesClient searchParams={qp} />
        </HydrationBoundary>
    )
}