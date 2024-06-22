import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [
        { title: "TORO Map" },
        { name: "description", content: "TOROMap2は軽量化されたTORO Server向けの地図アプリケーションです。" },
    ];
};

export async function loader({ params }: LoaderFunctionArgs) {
    return (params.arg ?? "");
}

export function Tester() {
    const arg = useLoaderData() as string;
    return <div>{arg}</div>;
}

export default function Index() {
    return (
        <Tester />
    );
}
