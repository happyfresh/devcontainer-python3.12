import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Progress } from '../components/ui/progress'
import viteLogo from '/vite.svg'

function HomePage() {
    const [count, setCount] = useState(0)
    const [progress, setProgress] = useState(33)

    const handleToastDemo = () => {
        toast.success('This is a success message!')
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-center space-x-4">
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>

                <h1 className="text-4xl font-bold text-center">Vite + React + Tailwind + shadcn/ui</h1>

                <div className="text-center mb-6">
                    <Link to="/upload">
                        <Button size="lg">Go to Image Upload →</Button>
                    </Link>
                </div>

                <div className="card bg-card border rounded-lg p-6 space-y-4">
                    <Button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </Button>
                    <p className="text-muted-foreground">
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">shadcn/ui Components Demo</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Input Component</label>
                            <Input placeholder="Type something here..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Button Variants</label>
                            <div className="flex space-x-2">
                                <Button variant="default">Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Progress Component ({progress}%)</label>
                        <Progress value={progress} className="w-full" />
                        <div className="flex space-x-2">
                            <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                                Decrease
                            </Button>
                            <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                                Increase
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Toaster Component</label>
                        <Button onClick={handleToastDemo}>
                            Show Toast
                        </Button>
                    </div>
                </div>

                <p className="text-center text-muted-foreground">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </div>
    )
}

export default HomePage