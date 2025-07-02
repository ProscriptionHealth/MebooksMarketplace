interface HeaderProps {
    onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    return (
        <header className="w-full bg-neural-bg/90 backdrop-blur-md border-b border-ai-teal/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => onNavigate('/')}
                            className="flex items-center space-x-2 text-2xl font-bold text-ai-blue hover:text-ai-teal transition-colors duration-200"
                        >
                            <span className="bg-gradient-to-r from-ai-blue to-ai-teal bg-clip-text text-transparent">
                                Mebooks.ai
                            </span>
                        </button>
                    </div>

                    {/* Simple Navigation */}
                    <nav className="flex items-center space-x-8">
                        <button
                            onClick={() => onNavigate('/about')}
                            className="text-text-secondary hover:text-ai-teal transition-colors duration-200"
                        >
                            About
                        </button>
                        <button
                            onClick={() => onNavigate('/authors')}
                            className="text-text-secondary hover:text-ai-teal transition-colors duration-200"
                        >
                            Authors
                        </button>
                        <button
                            onClick={() => onNavigate('/how-it-works')}
                            className="text-text-secondary hover:text-ai-teal transition-colors duration-200"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => onNavigate('/seekers')}
                            className="text-text-secondary hover:text-ai-teal transition-colors duration-200"
                        >
                            Seekers
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};