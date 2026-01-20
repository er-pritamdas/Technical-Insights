import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';

const TableOfContents = ({ content, className = '' }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        // Parse headings from markdown content
        const lines = content.split('\n');
        const extractedHeadings = lines
            .filter(line => line.startsWith('## ') || line.startsWith('### '))
            .map(line => {
                const level = line.startsWith('### ') ? 3 : 2;
                const text = line.replace(/^#{2,3} /, '');
                const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                return { id, text, level };
            });
        setHeadings(extractedHeadings);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`hidden xl:block ${className}`}
        >
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
                <div className="flex items-center gap-2 text-cyan-400 mb-4 font-bold">
                    <List size={20} />
                    <span>Table of Contents</span>
                </div>
                <nav className="space-y-1">
                    {headings.map(({ id, text, level }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`block text-sm py-1.5 transition-all border-l-2 pl-4 ${activeId === id
                                ? 'border-cyan-400 text-cyan-400 font-medium bg-cyan-950/20 rounded-r-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700'
                                } ${level === 3 ? 'ml-4' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(id);
                                if (element) {
                                    const y = element.getBoundingClientRect().top + window.scrollY - 100;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                                setActiveId(id);
                            }}
                        >
                            {text}
                        </a>
                    ))}
                </nav>
            </div>
        </motion.div>
    );
};

export default TableOfContents;
