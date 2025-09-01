// export default async function Modal() {
//     return (
//         <>null</>
//     )
// }
// app/@modal/(.)notes/[id]/page.tsx
import { getSingleNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
// import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

type Props = {
    params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
    const { id } = await params;
    // const note = await getSingleNote(id);


    const qc: QueryClient = new QueryClient()
    await qc.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(id),
    })
    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NotePreviewClient />
        </HydrationBoundary>
    )
}


import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import NotePreviewClient from './NotePreview.client';
