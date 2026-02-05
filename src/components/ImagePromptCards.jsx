import React, { useState } from 'react';
import { imagePromptsData } from '../data/imagePrompts';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, Expand } from 'lucide-react';

const ImagePromptCards = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract unique categories
    const categories = ['All', ...new Set(imagePromptsData.map(item => item.category))];

    const filteredItems = selectedCategory === 'All'
        ? imagePromptsData
        : imagePromptsData.filter(item => item.category === selectedCategory);

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
                {filteredItems.map((item, index) => (
                    <motion.div
                        layout
                        key={`${item.title}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedItem(item)}
                        className="group relative h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300"
                    >
                        {/* Background Image - Always Visible */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-60 transition-opacity duration-500 transform group-hover:scale-110"
                            style={{ backgroundImage: `url('${item.image}')` }}
                        />

                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/40 group-hover:from-slate-950 group-hover:via-slate-950/90 group-hover:to-slate-900/60 transition-all duration-300" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-6 z-10">
                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <Expand size={16} className="text-white" />
                            </div>

                            <div className="transform transition-all duration-300 group-hover:-translate-y-1">
                                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                                    {item.category}
                                </span>
                                <h3 className="text-xl font-bold text-white leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-300 text-sm mt-2 opacity-80 line-clamp-2">
                                    {item.prompts.length} prompt variations inside
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-5xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden h-[85vh] md:h-[90vh] flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Image Section (Left side on desktop, Top on mobile) */}
                            <div className="w-full md:w-1/2 h-48 md:h-auto bg-black relative shrink-0">
                                <div 
                                    className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url('${selectedItem.image}')` }}
                                />
                            </div>

                            {/* Content Section (Right side on desktop, Bottom on mobile) */}
                            <div className="w-full md:w-1/2 flex flex-col h-full bg-slate-900 min-h-0">
                                <div className="p-6 md:p-8 border-b border-slate-800 shrink-0">
                                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                                        {selectedItem.category}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedItem.title}</h2>
                                    <p className="text-slate-400 text-sm">
                                        Use these prompts with Midjourney, DALL-E 3, or Stable Diffusion.
                                    </p>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-6">
                                    {selectedItem.prompts.map((prompt, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-500 text-xs font-mono uppercase">Variation {index + 1}</span>
                                            </div>
                                            <CopyCodeBlock code={prompt} />
                                        </div>
                                    ))}
                                </div>
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
                className="absolute right-3 top-3 p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700/50 z-10 opacity-0 group-hover:opacity-100"
                title="Copy prompt"
            >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-300 font-mono text-sm leading-relaxed whitespace-pre-wrap hover:border-slate-700 transition-colors">
                {code}
            </div>
        </div>
    );
};

export default ImagePromptCards;
