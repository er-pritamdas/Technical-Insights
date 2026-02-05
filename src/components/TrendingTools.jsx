import React from 'react';
import { trendingToolsData } from '../data/trendingTools';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const TrendingTools = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    // Extract categories
    const categories = ['All', ...trendingToolsData.map(item => item.category)];

    // Flatten tools with their category appended
    const allTools = trendingToolsData.flatMap(section => 
        section.tools.map(tool => ({ ...tool, category: section.category }))
    );

    const filteredTools = selectedCategory === 'All' 
        ? allTools 
        : allTools.filter(tool => tool.category === selectedCategory);

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
                {filteredTools.map((tool, i) => (
                    <motion.div 
                        key={`${tool.name}-${i}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => window.open(tool.url, '_blank')}
                        className="group relative h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
                    >
                        {/* Background Image Layer */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-60 transition-opacity duration-500 transform group-hover:scale-110"
                            style={{ backgroundImage: `url(${tool.image})` }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent group-hover:from-slate-950 group-hover:via-slate-950/90 group-hover:to-slate-900/40 transition-all duration-300" />
                        
                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-6 z-10">
                            <div className="absolute top-4 right-4 bg-slate-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm">
                                <ExternalLink size={16} className="text-cyan-400" />
                            </div>
                            
                            <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                                    {tool.category}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 line-clamp-3">
                                    {tool.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TrendingTools;
