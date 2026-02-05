import React, { useState } from 'react';
import { aiPromptsData } from '../data/aiPrompts';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X } from 'lucide-react';

const toolIcons = {
    "ChatGPT": {
        icon: "/AI-Icons/chatgpt.png",
        url: "https://chat.openai.com"
    },
    "Claude": {
        icon: "/AI-Icons/claude.png",
        url: "https://claude.ai"
    },
    "Gemini": {
        icon: "/AI-Icons/gemini.png",
        url: "https://gemini.google.com"
    },
    "Kimi AI": {
        icon: "/AI-Icons/kimi.png",
        url: "https://www.kimi.com/en/slides"
    }
};

const AIPromptCards = () => {
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract unique categories
    const categories = ['All', ...new Set(aiPromptsData.map(item => item.category))];

    const filteredPrompts = selectedCategory === 'All' 
        ? aiPromptsData 
        : aiPromptsData.filter(prompt => prompt.category === selectedCategory);

    return (
        <div className="space-y-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category
                                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPrompts.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedPrompt(item)}
                        className="group relative h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
                    >
                        {/* Background Image Layer */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-60 transition-opacity duration-500 transform group-hover:scale-110"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/40 group-hover:from-slate-950 group-hover:via-slate-950/90 group-hover:to-slate-900/60 transition-all duration-300" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-6 z-10">
                            <div className="absolute top-4 left-4 text-3xl">
                                {item.icon}
                            </div>
                            
                            <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 line-clamp-2">
                                    {item.context}
                                </p>
                                
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {item.tools.map((tool, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded bg-black/40 text-cyan-200 border border-cyan-500/20">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedPrompt && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPrompt(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-3xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-900/50">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">{selectedPrompt.icon}</div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">{selectedPrompt.title}</h2>
                                        <p className="text-slate-400">{selectedPrompt.context}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedPrompt(null)}
                                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <div className="mb-6 flex items-center gap-4">
                                    <span className="text-slate-500 text-sm">Compatible with:</span>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedPrompt.tools.map((tool, i) => {
                                            const toolData = toolIcons[tool];
                                            if (toolData) {
                                                return (
                                                    <a 
                                                        key={i} 
                                                        href={toolData.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="hover:scale-110 transition-transform"
                                                        title={tool}
                                                    >
                                                        <img src={toolData.icon} alt={tool} className="w-8 h-8 rounded-full bg-white p-1" />
                                                    </a>
                                                );
                                            }
                                            return (
                                                <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                                    {tool}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>

                                <CopyCodeBlock code={selectedPrompt.prompt} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CopyCodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute right-4 top-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700 z-10"
                title="Copy prompt"
            >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
            <pre className="whitespace-pre-wrap break-words bg-slate-950 border border-slate-800 rounded-xl p-6 text-slate-300 font-mono text-sm leading-relaxed">
                {code}
            </pre>
        </div>
    );
};

export default AIPromptCards;
