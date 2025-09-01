"use client"

import { getSingleNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

type Props = {
    params: Promise<{ id: string }>;
};

export default function NotePreviewClient() {
    // const { id } = await params;
    // const note = await getSingleNote(id);

    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(id),
        refetchOnMount: false,
    });
    if (isLoading) return <Modal><p>is Loading...</p></Modal>;
    if (error || !note) return <Modal><p>is error loading note</p></Modal>;
    return (
        <Modal onClose={() => router.back()}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
        </Modal>
    );
};
