import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
    return [
        { title: 'TORO Map' },
        {
            name: 'description',
            content: 'TOROMap2は軽量化されたTORO Server向けの地図アプリケーションです。',
        },
    ]
}

export default function Index() {
    return <></>
}
