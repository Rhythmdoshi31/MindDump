export default function NavBar() {
    return (
        <nav className="h-[10svh] w-full flex items-center justify-between px-8 z-10">
            <div className="flex items-center justify-between gap-6">
                <h1 className="text-2xl text-white font-medium z-10">MindDump</h1>
                <h1 className="relative inline-block text-white font-medium group z-10">
                    <span className="relative text-gray-100">Home</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gray-100 transition-all ease-in-out duration-200 group-hover:w-full"></span>
                </h1>

                <h1 className="relative inline-block text-white font-medium group z-10">
                    <span className="relative text-gray-100">Daily Nudge</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gray-100 transition-all ease-in-out duration-200 group-hover:w-full"></span>
                </h1>
                <h1 className="relative inline-block text-white font-medium group z-10">
                    <span className="relative text-gray-100">Feeling Stuck?</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gray-100 transition-all ease-in-out duration-200 group-hover:w-full"></span>
                </h1>
            </div>
            <div className="flex items-center gap-4 z-10">
                <button className="bg-indigo-600 text-white px-3 py-2 rounded-3xl hover:bg-indigo-800 transition-all ease-in-out duration-200">
                    SignIn
                </button>
                <button className="text-white px-3 py-2 z-10">
                🌙
                </button>
            </div>
        </nav>
    )
}